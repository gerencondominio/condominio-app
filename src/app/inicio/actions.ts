'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getImprovements() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('improvements')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching improvements:', error)
        return []
    }

    return data || []
}

export async function saveImprovement(formData: {
    id?: string
    title: string
    description: string
    amount: number
    progress: number
    status: string
    icon: string
}) {
    const supabase = await createClient()

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Não autenticado' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Acesso negado. Apenas administradores podem gerenciar melhorias.' }
    }

    // Calculate current_amount based on progress percentage
    const current_amount = (formData.amount * formData.progress) / 100

    if (formData.id) {
        // Update existing
        const { error } = await supabase
            .from('improvements')
            .update({
                title: formData.title,
                description: formData.description,
                amount: formData.amount,
                current_amount,
                status: formData.status,
                icon: formData.icon,
            })
            .eq('id', formData.id)

        if (error) {
            console.error('Error updating improvement:', error)
            return { error: 'Erro ao atualizar melhoria' }
        }
    } else {
        // Create new
        const { error } = await supabase
            .from('improvements')
            .insert({
                title: formData.title,
                description: formData.description,
                amount: formData.amount,
                current_amount,
                status: formData.status,
                icon: formData.icon,
            })

        if (error) {
            console.error('Error creating improvement:', error)
            return { error: 'Erro ao criar melhoria' }
        }
    }

    revalidatePath('/inicio')
    return { success: true }
}

export async function deleteImprovement(id: string) {
    const supabase = await createClient()

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Não autenticado' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Acesso negado' }
    }

    const { error } = await supabase
        .from('improvements')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting improvement:', error)
        return { error: 'Erro ao deletar melhoria' }
    }

    revalidatePath('/inicio')
    return { success: true }
}

export async function checkIsAdmin() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    return profile?.role === 'admin'
}

export async function getFinancialStats() {
    const supabase = await createClient()

    const { data: paidInvoices, error } = await supabase
        .from('invoices')
        .select('total_amount, items')
        .eq('status', 'paid')

    if (error || !paidInvoices) {
        return {
            totalArrecadado: 0,
            totalTaxas: 0
        }
    }

    let totalArrecadado = 0
    let totalTaxas = 0

    paidInvoices.forEach(invoice => {
        let appFee = 0
        const items = invoice.items as any[]
        if (items && Array.isArray(items)) {
            const feeItem = items.find((item: any) =>
                item.description === 'Taxa do Aplicativo' ||
                item.label === 'Taxa do Aplicativo'
            )
            if (feeItem) {
                // Handle both numeric and string values in mock/real data
                const val = feeItem.value
                if (typeof val === 'string') {
                    appFee = Number(val.replace('R$ ', '').replace('.', '').replace(',', '.')) || 2.5
                } else {
                    appFee = Number(val) || 2.5
                }
            } else {
                appFee = 2.5
            }
        } else {
            appFee = 2.5
        }

        totalTaxas += appFee
        totalArrecadado += (Number(invoice.total_amount) - appFee)
    })

    return {
        totalArrecadado: Math.max(0, totalArrecadado),
        totalTaxas,
        totalExtra: 0
    }
}

export async function getUserName() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

    if (data?.full_name) {
        return data.full_name.split(' ')[0]
    }

    return null
}
