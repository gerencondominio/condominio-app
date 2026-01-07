import Link from 'next/link'
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function PaymentMethodsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="p-6 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/perfil" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-lg font-bold text-gray-900">Métodos de Pagamento</h1>
            </header>

            <div className="p-6 max-w-md mx-auto space-y-6">
                <h3 className="text-sm font-semibold text-gray-900">Seus Cartões</h3>

                <div className="space-y-4">
                    {/* Card 1 */}
                    <Card className="p-4 flex items-center justify-between group cursor-pointer hover:border-blue-200">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-8 bg-gray-900 rounded-md flex items-center justify-center text-white text-[8px] font-bold tracking-wider">
                                VISA
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Visa •••• 4242</p>
                                <p className="text-xs text-gray-500">Expira em 12/28</p>
                            </div>
                        </div>
                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </Card>

                    {/* Card 2 */}
                    <Card className="p-4 flex items-center justify-between group cursor-pointer hover:border-blue-200">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white text-[8px] font-bold tracking-wider relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-white/20 -ml-2 -mt-2"></div>
                                MC
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Mastercard •••• 8890</p>
                                <p className="text-xs text-gray-500">Expira em 05/26</p>
                            </div>
                        </div>
                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </Card>
                </div>

                <Button variant="outline" className="w-full border-dashed border-2 py-8 bg-gray-50 hover:bg-white hover:border-blue-300 hover:text-blue-600 group">
                    <Plus className="mr-2 h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                    <span className="text-gray-500 group-hover:text-blue-600">Adicionar novo cartão</span>
                </Button>
            </div>
        </div>
    )
}
