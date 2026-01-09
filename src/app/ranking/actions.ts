'use server'

import { createClient } from '@/lib/supabase/server'

export async function getRankings() {
    const supabase = await createClient()

    // 1. Top Commenters
    const { data: comments } = await supabase
        .from('community_comments')
        .select(`
            user_id,
            author:profiles(full_name, lot_number)
        `)

    const commentCounts: Record<string, any> = {}
    comments?.forEach((c: any) => {
        if (!commentCounts[c.user_id]) {
            commentCounts[c.user_id] = {
                id: c.user_id,
                name: c.author?.full_name || 'Desconhecido',
                lot: c.author?.lot_number,
                count: 0
            }
        }
        commentCounts[c.user_id].count++
    })
    const topCommenters = Object.values(commentCounts)
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 5)


    // 2. Top Contributors (Financial)
    // Assuming 'invoices' has user_id and total_amount, status='paid'
    const { data: invoices } = await supabase
        .from('invoices')
        .select(`
            total_amount,
            user_id,
            author:profiles(full_name, lot_number)
        `)
        .eq('status', 'paid')

    const contributionCounts: Record<string, any> = {}
    invoices?.forEach((inv: any) => {
        if (!contributionCounts[inv.user_id]) {
            contributionCounts[inv.user_id] = {
                id: inv.user_id,
                name: inv.author?.full_name || 'Desconhecido',
                lot: inv.author?.lot_number,
                value: 0
            }
        }
        contributionCounts[inv.user_id].value += Number(inv.total_amount)
    })
    const topContributors = Object.values(contributionCounts)
        .sort((a: any, b: any) => b.value - a.value)
        .slice(0, 5)


    // 3. Top Interactors (Likes Given)
    const { data: likes } = await supabase
        .from('community_likes')
        .select(`
            user_id,
            author:profiles(full_name, lot_number)
        `)

    const likeCounts: Record<string, any> = {}
    likes?.forEach((l: any) => {
        if (!likeCounts[l.user_id]) {
            likeCounts[l.user_id] = {
                id: l.user_id,
                name: l.author?.full_name || 'Desconhecido',
                lot: l.author?.lot_number,
                count: 0
            }
        }
        likeCounts[l.user_id].count++
    })

    const topInteractors = Object.values(likeCounts)
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 5)

    return {
        topCommenters,
        topContributors,
        topInteractors
    }
}
