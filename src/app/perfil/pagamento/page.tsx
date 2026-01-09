'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AddCardModal } from '@/components/profile/AddCardModal'
import { AnimatedList, AnimatedItem } from '@/components/ui/AnimatedList'
import confetti from 'canvas-confetti'
import { useToast } from '@/components/ui/Toast'

interface PaymentCard {
    id: string
    brand: string
    last4: string
    expiry: string
    color: string
}

export default function PaymentMethodsPage() {
    const { addToast } = useToast()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cards, setCards] = useState<PaymentCard[]>([
        { id: '1', brand: 'VISA', last4: '4242', expiry: '12/28', color: 'bg-gray-900' },
        { id: '2', brand: 'MC', last4: '8890', expiry: '05/26', color: 'bg-orange-500' }
    ])

    const handleSaveCard = (cardData: any) => {
        const newCard: PaymentCard = {
            id: Math.random().toString(),
            brand: 'VISA', // logic to detect brand could be added
            last4: cardData.last4,
            expiry: cardData.expiry,
            color: 'bg-blue-600'
        }

        setCards([...cards, newCard])

        // Confetti effect
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#10b981', '#f59e0b']
        })

        addToast({
            title: 'Cartão adicionado',
            description: 'Seu novo método de pagamento foi salvo com sucesso.',
            type: 'success'
        })
    }

    const handleDeleteCard = (id: string) => {
        if (confirm('Remover este cartão?')) {
            setCards(cards.filter(c => c.id !== id))
            addToast({
                title: 'Cartão removido',
                description: 'O método de pagamento foi excluído.',
                type: 'info'
            })
        }
    }

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

                <AnimatedList className="space-y-4">
                    {cards.map((card, index) => (
                        <AnimatedItem key={card.id} index={index}>
                            <Card className="p-4 flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-8 ${card.color} rounded-md flex items-center justify-center text-white text-[8px] font-bold tracking-wider relative overflow-hidden shadow-sm`}>
                                        {card.brand === 'MC' && (
                                            <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-white/20 -ml-2 -mt-2"></div>
                                        )}
                                        {card.brand}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 capitalize">{card.brand === 'MC' ? 'Mastercard' : 'Visa'} •••• {card.last4}</p>
                                        <p className="text-xs text-gray-500">Expira em {card.expiry}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCard(card.id);
                                    }}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors relative z-10"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </Card>
                        </AnimatedItem>
                    ))}
                </AnimatedList>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="w-full border-dashed border-2 py-8 bg-gray-50 hover:bg-white hover:border-blue-300 hover:text-blue-600 group transition-all"
                >
                    <Plus className="mr-2 h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                    <span className="text-gray-500 group-hover:text-blue-600">Adicionar novo cartão</span>
                </Button>
            </div>

            <AddCardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCard}
            />
        </div>
    )
}
