'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updatePassword(newPassword: string) {
    const supabase = await createClient()

    if (!newPassword || newPassword.length < 6) {
        return { error: 'A senha deve ter pelo menos 6 caracteres.' }
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    })

    if (error) {
        console.error('Password update error:', error)
        return { error: 'Erro ao atualizar senha. Tente novamente.' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}
