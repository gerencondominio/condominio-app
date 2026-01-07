'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function signup(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const cpf = formData.get('cpf') as string
    const unit = formData.get('unit') as string

    if (!email || !password || !name) {
        return { error: 'Campos obrigatórios faltando.' }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                cpf: cpf,
                unit: unit,
            },
        },
    })

    if (error) {
        return {
            error: error.message,
            payload: {
                name,
                email,
                cpf,
                unit: formData.get('unit') as string,
                condoCode: formData.get('condoCode') as string,
                birthDate: formData.get('birthDate') as string,
            }
        }
    }

    revalidatePath('/', 'layout')
    // Typically redirect to a verification page or login
    // For this app, let's redirect to login with a success message or straight to dashboard if auto-confirm is on
    // But usually requires email verification.
    // We'll redirect to login with a success query param
    redirect('/login?message=Cadastro realizado! Verifique seu email para confirmar.')
}
