'use server'

import { createClient } from '@/lib/supabase/server'

export async function resetPassword(email: string) {
    const supabase = await createClient()

    if (!email) {
        return { error: 'Por favor, informe um e-mail válido.' }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    })

    if (error) {
        console.error('Password reset error:', error)
        return { error: 'Erro ao enviar e-mail de recuperação. Tente novamente.' }
    }

    return { success: true }
}
