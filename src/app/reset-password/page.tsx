'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { updatePassword } from './actions'

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsPending(true)
        setError('')

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            setIsPending(false)
            return
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.')
            setIsPending(false)
            return
        }

        const result = await updatePassword(password)

        if (result?.error) {
            setError(result.error)
            setIsPending(false)
        } else {
            alert('Senha alterada com sucesso!')
            router.push('/login')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-8">
            <Card className="w-full max-w-md p-6 space-y-6 bg-white shadow-xl rounded-2xl">
                <div className="text-center space-y-2">
                    <div className="bg-blue-50 inline-flex p-4 rounded-full mb-2">
                        <Lock className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Redefinir Senha</h2>
                    <p className="text-sm text-gray-500 px-4">
                        Digite sua nova senha abaixo.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Input
                            label="NOVA SENHA"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <Input
                            label="CONFIRMAR NOVA SENHA"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full text-base py-6 font-semibold mt-4"
                        disabled={isPending}
                    >
                        {isPending ? 'Atualizando...' : 'Redefinir Senha'}
                    </Button>

                    <div className="text-center text-sm">
                        <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                            Voltar para o Login
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}
