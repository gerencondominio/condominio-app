import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="p-6 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/perfil" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-lg font-bold text-gray-900">Segurança e Senha</h1>
            </header>

            <div className="p-6 max-w-md mx-auto space-y-6">
                <div className="bg-blue-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-900">Senha Forte</h3>
                    <p className="text-xs text-gray-500 max-w-[200px]">Sua senha foi alterada pela última vez há 90 dias. Recomendamos atualizar regularmente.</p>
                </div>

                <form className="space-y-4">
                    <Input label="SENHA ATUAL" type="password" placeholder="••••••••" />
                    <div className="border-t border-gray-100 my-4"></div>
                    <Input label="NOVA SENHA" type="password" placeholder="••••••••" />
                    <Input label="CONFIRMAR NOVA SENHA" type="password" placeholder="••••••••" />

                    <p className="text-xs text-gray-500 italic">
                        A senha deve conter pelo menos 8 caracteres, incluindo letras e números.
                    </p>

                    <Button className="w-full py-6 mt-4">
                        Alterar Senha
                    </Button>
                </form>
            </div>
        </div>
    )
}
