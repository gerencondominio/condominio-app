'use client'

import { useState } from 'react'
import { Eye, EyeOff, TrendingUp, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface BalanceCardProps {
    amount: number
    taxas: number
}

export function BalanceCard({ amount, taxas }: BalanceCardProps) {
    const [isVisible, setIsVisible] = useState(true)

    // Mock sparkline data
    const points = [40, 45, 42, 50, 48, 55, 60, 58, 65, 70, 68, 75]
    const width = 300
    const height = 60
    const sparklinePath = points.map((p, i) => {
        const x = (i / (points.length - 1)) * width
        const y = height - ((p - 40) / (75 - 40)) * height
        return `${i === 0 ? 'M' : 'L'} ${x},${y}`
    }).join(' ')

    return (
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-none text-white overflow-hidden relative shadow-blue-200 shadow-xl group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>
            </div>

            <div className="p-6 md:p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <p className="text-blue-100 text-sm font-medium">Saldo Líquido em Caixa</p>
                            <button
                                onClick={() => setIsVisible(!isVisible)}
                                className="text-blue-200 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                            >
                                {isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                            </button>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                {isVisible ? (
                                    <span className="flex items-center gap-1">
                                        <span className="text-2xl md:text-3xl font-medium opacity-70">R$</span>
                                        {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                ) : (
                                    <span className="tracking-widest">•••••••</span>
                                )}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-between">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-colors hover:bg-white/20">
                            <TrendingUp className="h-3.5 w-3.5 text-green-300" />
                            <span>+12% este mês</span>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-blue-300/50"></div>
                        <span className="text-xs text-blue-100">Atualizado hoje</span>
                    </div>

                    <Link href="/pagamentos">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/10 font-normal gap-2"
                        >
                            Ver Extrato
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Sparkline Graph */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none opacity-20">
                <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                    <path d={sparklinePath} fill="none" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <path d={`${sparklinePath} L ${width},${height} L 0,${height} Z`} fill="url(#gradient)" stroke="none" />
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </Card>
    )
}
