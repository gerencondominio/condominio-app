'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { resetPassword } from './actions'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsPending(true)
        setMessage('')
        setError('')

        const result = await resetPassword(email)

        if (result?.error) {
            setError(result.error)
        } else {
            setMessage('Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.')
        }

        setIsPending(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-8">
            <Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-xl rounded-2xl">
                <div className="flex items-center mb-4">
                    <Link href="/login" className="text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-xl font-bold text-center flex-1 pr-6 text-gray-900">Recuperar Senha</h1>
                </div>

                <div className="text-center space-y-2">
                    <div className="bg-blue-50 inline-flex p-4 rounded-full mb-2">
                        <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Esqueceu sua senha?</h2>
                    <p className="text-sm text-gray-500 px-4">
                        Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="E-MAIL"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="text-green-600 text-sm text-center font-medium bg-green-50 p-3 rounded-lg">
                            {message}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full text-base py-6 font-semibold mt-4"
                        disabled={isPending}
                    >
                        {isPending ? 'Enviando...' : 'Enviar Link de Recuperação'}
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Lembrou sua senha? </span>
                        <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                            Fazer login
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}
