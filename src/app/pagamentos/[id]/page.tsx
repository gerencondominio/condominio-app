import Link from 'next/link'
import { ArrowLeft, Copy, Download, Share2, Wallet } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
    // Mock data - normally fetch by params.id
    const invoice = {
        month: 'Outubro/2023',
        total: 'R$ 52,50',
        due_date: '10 Nov 2023',
        status: 'pending',
        items: [
            { label: 'Taxa de Condomínio', value: 'R$ 50,00' },
            { label: 'Taxa do Aplicativo', value: 'R$ 2,50' },
            { label: 'Taxa Extra', value: 'R$ 0,00' },
        ]
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="lg:hidden p-6 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/pagamentos" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-lg font-bold text-gray-900">Detalhes da Fatura</h1>
            </header>

            <div className="p-6 max-w-md lg:max-w-3xl mx-auto space-y-6">

                <div className="hidden lg:flex items-center gap-4 mb-6">
                    <Link href="/pagamentos" className="text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Detalhes da Fatura</h1>
                </div>

                {/* Main Status Card */}
                <Card className="p-6 text-center space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="text-left">
                            <p className="text-sm text-gray-500">Valor Total</p>
                            <h2 className="text-3xl font-bold text-gray-900">{invoice.total}</h2>
                        </div>
                        <Badge variant="warning">Pendente</Badge>
                    </div>

                    <div className="flex justify-between text-sm pt-4 border-t border-gray-100">
                        <div className="text-left">
                            <p className="text-gray-500">Vencimento</p>
                            <p className="font-medium text-gray-900">{invoice.due_date}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500">Mês de Referência</p>
                            <p className="font-medium text-gray-900">{invoice.month}</p>
                        </div>
                    </div>
                </Card>

                {/* Actions Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="flex flex-col h-20 gap-2 items-center justify-center" size="lg">
                        <Copy className="h-5 w-5 text-blue-600" />
                        <span className="text-xs font-medium">Copiar Código</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-20 gap-2 items-center justify-center" size="lg">
                        <Download className="h-5 w-5 text-blue-600" />
                        <span className="text-xs font-medium">Baixar PDF</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-20 gap-2 items-center justify-center" size="lg">
                        <Share2 className="h-5 w-5 text-blue-600" />
                        <span className="text-xs font-medium">Compartilhar</span>
                    </Button>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">Detalhamento da Cobrança</h3>
                    <Card className="p-0 overflow-hidden divide-y divide-gray-100">
                        {invoice.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between p-4">
                                <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${['bg-blue-500', 'bg-green-500', 'bg-cyan-500'][idx % 3]}`}></div>
                                    {item.label}
                                </span>
                                <span className="text-sm font-bold text-gray-900">{item.value}</span>
                            </div>
                        ))}
                    </Card>
                </div>

                {/* History / Status Line could go here */}

                <Button className="w-full py-6 text-base font-semibold shadow-lg shadow-blue-200">
                    <Wallet className="mr-2 h-5 w-5" />
                    Pagar Fatura
                </Button>
            </div>
        </div>
    )
}
