import { Bell, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { getImprovements, checkIsAdmin, getFinancialStats } from './actions'
import { ImprovementsSection } from './ImprovementsSection'
export default async function DashboardPage() {
    const improvements = await getImprovements()
    const isAdmin = await checkIsAdmin()
    const stats = await getFinancialStats()

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="flex items-center justify-between p-6 bg-white sticky top-0 z-10">
                <h1 className="text-lg font-bold text-gray-900">Visão Geral</h1>
                <Link href="/notificacoes">
                    <Button variant="ghost" size="icon" className="relative text-gray-500">
                        <Bell className="h-6 w-6" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                    </Button>
                </Link>
            </header>

            <div className="p-6 space-y-6 max-w-md lg:max-w-6xl mx-auto">

                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
                    {/* Left Column: Finances */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Balance Card */}
                        <Card className="bg-blue-600 border-none text-white p-6 md:p-8 shadow-blue-200 shadow-xl overflow-hidden relative">
                            <div className="relative z-10">
                                <p className="text-blue-100 text-sm font-medium mb-1">Saldo Líquido em Caixa</p>
                                <h2 className="text-3xl md:text-5xl font-bold mb-4" suppressHydrationWarning>
                                    R$ {stats.totalArrecadado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </h2>
                                <div className="inline-flex items-center gap-1 bg-blue-500/50 px-3 py-1 rounded-full text-xs font-medium">
                                    <TrendingUp className="h-3 w-3" />
                                    <span>Saldo disponível para melhorias</span>
                                </div>
                            </div>
                            {/* Decorative shapes */}
                            <div className="absolute right-0 top-0 h-32 w-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <div className="absolute left-0 bottom-0 h-24 w-24 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                        </Card>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {isAdmin && (
                                <>
                                    <Card className="p-4 flex flex-col justify-center space-y-2 hover:border-blue-200 transition-colors">
                                        <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600">
                                            <WalletIcon />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Arrecadação Bruta</p>
                                            <p className="text-lg font-bold text-gray-900" suppressHydrationWarning>
                                                R$ {(stats.totalArrecadado + stats.totalTaxas).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </Card>

                                    <Card className="p-4 flex flex-col justify-center space-y-2 hover:border-red-200 transition-colors">
                                        <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center text-red-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Taxas App</p>
                                            <p className="text-lg font-bold text-red-600" suppressHydrationWarning>
                                                R$ {stats.totalTaxas.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </Card>
                                </>
                            )}

                            <Card className={`p-4 flex flex-col justify-center space-y-2 hover:border-orange-200 transition-colors ${isAdmin ? 'lg:col-span-1 col-span-2' : 'col-span-2 lg:col-span-3'}`}>
                                <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center text-orange-600">
                                    <ToolIcon />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Manutenção Mensal</p>
                                    <p className="text-lg font-bold text-gray-900">R$ 450,00</p>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column: Improvements */}
                    <ImprovementsSection improvements={improvements} isAdmin={isAdmin} />
                </div>
            </div>
        </div>
    )
}

// Icons
function WalletIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
    )
}

function ToolIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
    )
}
