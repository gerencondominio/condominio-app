'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { login } from './actions'
import { useState } from 'react'

const initialState = {
    error: '',
}

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, initialState)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-xl rounded-2xl">
                <div className="space-y-2 text-center">
                    {/* Image */}
                    <div className="h-40 w-full bg-gray-200 rounded-xl mb-6 relative overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt="Condominio"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
                            <span className="text-white text-xs font-medium tracking-wide">Condomínio App</span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Bem-vindo ao App
                    </h1>
                    <p className="text-sm text-gray-500">
                        Gestão inteligente e transparente para o seu dia a dia.
                    </p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="email"
                                name="email"
                                placeholder="E-mail ou CPF"
                                className="pl-10"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                className="pl-10 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">
                            {state.error}
                        </div>
                    )}

                    <div className="flex items-center justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Esqueci minha senha
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <Button
                            type="submit"
                            className="w-full text-base py-6 font-semibold"
                            disabled={isPending}
                        >
                            {isPending ? 'Entrando...' : 'Entrar'}
                        </Button>

                        <Link href="/cadastro" className="block">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full text-base py-6 font-semibold text-gray-700"
                            >
                                Cadastre-se
                            </Button>
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}
