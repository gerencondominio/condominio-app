'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getPosts(filter?: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
        .from('community_posts')
        .select(`
            *,
            author:profiles(full_name, lot_number),
            community_likes(user_id),
            likes_count:community_likes(count),
            comments_count:community_comments(count)
        `)
        .order('created_at', { ascending: false })
        .limit(20)

    if (filter && filter !== 'Tudo') {
        const typeMap: Record<string, string> = {
            'Sugestão': 'suggestion',
            'Sugestões': 'suggestion',
            'Manutenção': 'maintenance',
            'Aviso': 'notice',
            'Avisos': 'notice',
            'Reclamação': 'complaint'
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

    // Map to UI format
    return posts.map((post: any) => {
        const likedByMe = user ? post.community_likes.some((like: any) => like.user_id === user.id) : false

        return {
            id: post.id,
            author: post.author?.full_name || 'Desconhecido',
            location: post.author?.lot_number ? `Unidade ${post.author.lot_number}` : '',
            time: post.created_at,
            content: post.content,
            type: post.type,
            tags: [
                post.type === 'suggestion' ? 'Sugestão' :
                    post.type === 'maintenance' ? 'Manutenção' :
                        post.type === 'complaint' ? 'Reclamação' :
                            'Aviso'
            ],
            likes: post.likes_count?.[0]?.count || 0,
            likes_count: post.likes_count?.[0]?.count || 0,
            comments: post.comments_count?.[0]?.count || 0,
            isAdmin: post.is_admin_post,
            likedByMe
        }
    })
}

export async function createPost(content: string, type: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Unauthorized' }

    // Map UI types to DB types
    const typeMap: Record<string, string> = {
        'Sugestão': 'suggestion',
        'Sugestões': 'suggestion',
        'Manutenção': 'maintenance',
        'Aviso': 'notice',
        'Avisos': 'notice',
        'Reclamação': 'complaint'
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
