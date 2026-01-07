import Link from 'next/link'
import { ArrowLeft, Edit2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function PersonalDataPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="p-6 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/perfil" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-lg font-bold text-gray-900">Dados Pessoais</h1>
            </header>

            <div className="p-6 max-w-md mx-auto space-y-8">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" className="w-full h-full object-cover" alt="Profile" />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full border-2 border-white shadow-sm hover:bg-blue-700">
                            <Edit2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <form className="space-y-5">
                    <Input label="NOME COMPLETO" defaultValue="Carlos Mendes" />
                    <Input label="CPF" defaultValue="123.456.789-00" />
                    <Input label="DATA DE NASCIMENTO" type="date" defaultValue="1985-05-15" />

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-700">Informações do Condomínio</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 uppercase">Número do Lote</p>
                                <p className="font-bold text-gray-900">302-B</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 uppercase">Cód. Condomínio</p>
                                <p className="font-bold text-gray-900">COND-9921</p>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full py-6 mt-4">
                        Salvar Alterações
                    </Button>
                </form>
            </div>
        </div>
    )
}
