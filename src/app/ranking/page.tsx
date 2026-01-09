'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Medal, MessageSquare, Heart, Trophy, User } from 'lucide-react' // Removed DollarSign
import { getRankings } from './actions'
import { cn } from '@/lib/utils'

export default function RankingPage() {
    const [activeTab, setActiveTab] = useState<'comments' | 'likes'>('comments') // Removed 'money'
    const [data, setData] = useState<any>({ topCommenters: [], topInteractors: [] }) // Removed topContributors
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const res = await getRankings()
            setData(res)
            setLoading(false)
        }
        load()
    }, [])

    const tabs = [
        { id: 'comments', label: 'Top Comentaristas', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' }, // Updated label and color
        { id: 'likes', label: 'Mais Engajados', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50' } // Updated label and color
    ]

    const getList = () => {
        switch (activeTab) {
            case 'comments': return { list: data.topCommenters, unit: 'comentários' };
            case 'likes': return { list: data.topInteractors, unit: 'curtidas' };
            default: return { list: [], unit: '' };
        }
    }

    const { list, unit } = getList() // Removed icon: ListIcon

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="p-6 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
                <div className="p-2 bg-yellow-100 rounded-xl text-yellow-600 shadow-sm">
                    <Trophy className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Podium Condomínio</h1>
                    <p className="text-xs text-gray-500">Reconhecendo quem participa mais!</p>
                </div>
            </header>

            <div className="p-6 max-w-md lg:max-w-4xl mx-auto space-y-8">

                {/* Tabs */}
                <div className="flex p-1 bg-white rounded-2xl shadow-sm border border-gray-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300",
                                activeTab === tab.id
                                    ? `bg-gray-900 text-white shadow-md transform scale-[1.02]`
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-white fill-current" : "")} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="space-y-3">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            <p className="text-gray-400 text-sm">Carregando estrelas...</p>
                        </div>
                    ) : list.length === 0 ? (
                        <Card className="p-12 text-center text-gray-500 border-dashed border-2 bg-transparent shadow-none">
                            <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300 opacity-50" />
                            <p>Ainda ninguém no podium. Seja o primeiro!</p>
                        </Card>
                    ) : (
                        list.map((item: any, index: number) => {
                            const isFirst = index === 0
                            const isTop3 = index < 3

                            let rankStyle = ''
                            let medalIcon = null

                            if (index === 0) {
                                rankStyle = 'bg-gradient-to-r from-yellow-50 via-white to-white border-yellow-200 ring-4 ring-yellow-50/50'
                                medalIcon = <div className="absolute -top-3 -left-3 bg-yellow-400 text-white p-1.5 rounded-full shadow-lg transform rotate-[-10deg] z-10"><Trophy className="h-4 w-4 fill-current" /></div>
                            } else if (index === 1) {
                                rankStyle = 'bg-gradient-to-r from-gray-50 via-white to-white border-gray-200'
                                medalIcon = <Medal className="h-6 w-6 text-gray-400" />
                            } else if (index === 2) {
                                rankStyle = 'bg-gradient-to-r from-orange-50 via-white to-white border-orange-200'
                                medalIcon = <Medal className="h-6 w-6 text-amber-700" />
                            }

                            return (
                                <div
                                    key={item.id}
                                    className={`relative transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {isFirst && medalIcon}

                                    <div className={cn(
                                        "relative flex items-center gap-4 p-4 rounded-2xl border transition-all hover:scale-[1.01] hover:shadow-md bg-white",
                                        isTop3 ? "shadow-sm" : "border-transparent bg-white shadow-sm",
                                        rankStyle
                                    )}>
                                        <div className="flex-shrink-0 w-8 font-bold text-lg text-center font-mono text-gray-300 flex items-center justify-center">
                                            {!isFirst && (isTop3 ? medalIcon : `#${index + 1}`)}
                                        </div>

                                        <div className={cn(
                                            "rounded-full flex items-center justify-center overflow-hidden border-2 shadow-sm transition-transform",
                                            isFirst ? "h-14 w-14 border-yellow-400 bg-yellow-100" : "h-10 w-10 border-white bg-gray-100"
                                        )}>
                                            <span className={cn(
                                                "font-bold",
                                                isFirst ? "text-xl text-yellow-700" : "text-gray-500"
                                            )}>{item.name[0]}</span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={cn("font-bold truncate", isFirst ? "text-lg text-gray-900" : "text-gray-700")}>
                                                {item.name}
                                                {isFirst && <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Líder</span>}
                                            </h3>
                                            {item.lot && <p className="text-xs text-gray-500">Unidade {item.lot}</p>}
                                        </div>

                                        <div className="text-right">
                                            <p className={cn("font-bold text-lg", activeTab === 'likes' ? "text-pink-600" : "text-blue-600")}>
                                                {item.count || item.value}
                                            </p>
                                            <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                                                {unit}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
