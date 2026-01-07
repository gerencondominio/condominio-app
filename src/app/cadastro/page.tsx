'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Building, Calendar, Lock, Home, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { signup } from './actions'

const initialState: {
    error: string;
    payload?: {
        name: string;
        email: string;
        cpf: string;
        birthDate: string;
        unit: string;
        condoCode: string;
    };
} = {
    error: '',
}

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(signup, initialState)

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-8">
            <Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-xl rounded-2xl">
                <div className="flex items-center mb-4">
                    <Link href="/login" className="text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-xl font-bold text-center flex-1 pr-6 text-gray-900">Novo Cadastro</h1>
                </div>

                <div className="text-center space-y-2">
                    <div className="bg-blue-50 inline-flex p-4 rounded-full mb-2">
                        <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Crie sua conta</h2>
                    <p className="text-sm text-gray-500 px-4">
                        Preencha os dados abaixo para ter acesso ao gerenciamento do seu condomínio.
                    </p>
                </div>

                <form action={formAction} className="space-y-5">
                    <Input
                        label="NOME COMPLETO"
                        name="name"
                        placeholder="Ex: João Silva"
                        defaultValue={state?.payload?.name as string}
                        required
                    />

                    <Input
                        label="E-MAIL"
                        name="email"
                        type="email"
                        placeholder="joao@exemplo.com"
                        defaultValue={state?.payload?.email as string}
                        required
                    />

                    <Input
                        label="CPF"
                        name="cpf"
                        placeholder="000.000.000-00"
                        defaultValue={state?.payload?.cpf as string}
                        required
                    />

                    <Input
                        label="DATA DE NASCIMENTO"
                        name="birthDate"
                        type="date"
                        defaultValue={state?.payload?.birthDate as string}
                        required
                    />

                    <Input
                        label="SENHA"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Nº LOTE"
                            name="unit"
                            placeholder="A-12"
                            defaultValue={state?.payload?.unit as string}
                            required
                        />
                        <Input
                            label="CÓD. COND."
                            name="condoCode"
                            placeholder="12345"
                            defaultValue={state?.payload?.condoCode as string}
                            required
                        />
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">
                            {state.error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full text-base py-6 font-semibold mt-4"
                        disabled={isPending}
                    >
                        {isPending ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Já possui uma conta? </span>
                        <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                            Faça login
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}
