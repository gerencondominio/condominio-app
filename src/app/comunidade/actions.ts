'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getPosts(filter?: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false })

    if (filter && filter !== 'Tudo') {
        const typeMap: Record<string, string> = {
            'Sugestões': 'suggestion',
            'Manutenção': 'maintenance',
            'Avisos': 'notice'
        }
        if (typeMap[filter]) {
            query = query.eq('type', typeMap[filter])
        }
    }

    const { data: posts, error } = await query

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    // Manual fetch of relations to avoid FK errors
    const postsWithData = await Promise.all(posts.map(async (post: any) => {
        // Fetch Author
        const { data: author } = await supabase
            .from('profiles')
            .select('full_name, lot_number')
            .eq('id', post.user_id)
            .single()

        // Fetch Likes Count
        const { count: likesCount } = await supabase
            .from('community_likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id)

        // Fetch Comments Count
        const { count: commentsCount } = await supabase
            .from('community_comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id)

        // Check if liked by me
        let likedByMe = false
        if (user) {
            const { data: like } = await supabase
                .from('community_likes')
                .select('id')
                .eq('post_id', post.id)
                .eq('user_id', user.id)
                .single()
            likedByMe = !!like
        }

        return {
            id: post.id,
            author: author?.full_name || 'Desconhecido',
            location: author?.lot_number ? `Unidade ${author.lot_number}` : '',
            time: post.created_at,
            content: post.content,
            type: post.type,
            tags: [post.type === 'suggestion' ? 'Sugestão' : post.type === 'maintenance' ? 'Manutenção' : 'Aviso'],
            likes: likesCount || 0,
            likes_count: likesCount || 0,
            comments: commentsCount || 0,
            isAdmin: post.is_admin_post,
            likedByMe
        }
    }))

    return postsWithData
}

export async function createPost(content: string, type: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    // Map UI types to DB types
    const typeMap: Record<string, string> = {
        'Sugestões': 'suggestion',
        'Manutenção': 'maintenance',
        'Avisos': 'notice'
    }
    const dbType = typeMap[type] || 'general'

    const { error } = await supabase.from('community_posts').insert({
        user_id: user.id,
        content,
        type: dbType
    })

    if (error) return { error: error.message }
    revalidatePath('/comunidade')
    return { success: true }
}

export async function toggleLike(postId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    // Check if already liked
    const { data: existingLike } = await supabase
        .from('community_likes')
        .select()
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single()

    if (existingLike) {
        // Unlike
        await supabase.from('community_likes').delete().eq('id', existingLike.id)
    } else {
        // Like
        await supabase.from('community_likes').insert({ post_id: postId, user_id: user.id })
    }

    revalidatePath('/comunidade')
}

export async function addComment(postId: string, content: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase.from('community_comments').insert({
        post_id: postId,
        user_id: user.id,
        content
    })

    if (error) return { error: error.message }
    revalidatePath('/comunidade')
}

export async function getComments(postId: string) {
    const supabase = await createClient()
    const { data: comments, error } = await supabase
        .from('community_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

    if (error || !comments) return []

    // Fetch authors manually
    const commentsWithAuthors = await Promise.all(comments.map(async (c: any) => {
        const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', c.user_id)
            .single()

        return {
            id: c.id,
            author: profile?.full_name || 'Desconhecido',
            content: c.content,
            created_at: c.created_at
        }
    }))

    return commentsWithAuthors
}
