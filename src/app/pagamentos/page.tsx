import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ChevronRight, FileText, AlertCircle } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { AnimatedList, AnimatedItem } from '@/components/ui/AnimatedList'

export default function PaymentsPage() {
    const invoices = [
        { id: '1', month: 'Outubro/2023', value: 'R$ 52,50', status: 'pending', date: '10 Nov 2023' },
        { id: '2', month: 'Setembro/2023', value: 'R$ 52,50', status: 'paid', date: '10 Out 2023' },
        { id: '3', month: 'Agosto/2023', value: 'R$ 52,50', status: 'paid', date: '10 Set 2023' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="lg:hidden p-6 bg-white border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">Pagamentos</h1>
            </header>

            <div className="p-6 space-y-4 max-w-md lg:max-w-6xl mx-auto">

                <h1 className="hidden lg:block text-2xl font-bold text-gray-900 mb-6">Pagamentos</h1>

                <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Histórico de Faturas</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-4">
                        {invoices.length === 0 ? (
                            <div className="col-span-full">
                                <EmptyState
                                    icon={AlertCircle}
                                    title="Tudo em dia!"
                                    description="Você não possui faturas pendentes ou histórico recente."
                                />
                            </div>
                        ) : (
                            invoices.map((invoice, index) => (
                                <AnimatedItem key={invoice.id} index={index}>
                                    <Link href={`/pagamentos/${invoice.id}`}>
                                        <Card className="p-4 flex items-center justify-between hover:border-blue-200 transition-colors cursor-pointer group h-full">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${invoice.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    <FileText className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{invoice.month}</h3>
                                                    <p className="text-sm text-gray-500">Vencimento {invoice.date}</p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">{invoice.value}</p>
                                                <Badge
                                                    variant={invoice.status === 'pending' ? 'warning' : 'success'}
                                                    className="mt-1"
                                                >
                                                    {invoice.status === 'pending' ? 'Pendente' : 'Pago'}
                                                </Badge>
                                            </div>
                                        </Card>
                                    </Link>
                                </AnimatedItem>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
