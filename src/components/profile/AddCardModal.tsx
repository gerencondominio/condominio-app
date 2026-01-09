'use client'

import React, { useState } from 'react'
import { X, CreditCard, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface AddCardModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (card: any) => void
}

export function AddCardModal({ isOpen, onClose, onSave }: AddCardModalProps) {
    const [cardNumber, setCardNumber] = useState('')
    const [holderName, setHolderName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')
    const [isFlipped, setIsFlipped] = useState(false)
    const [loading, setLoading] = useState(false)

    // Format card number
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value.replace(/\D/g, '').substring(0, 16)
        const parts = []
        for (let i = 0; i < v.length; i += 4) {
            parts.push(v.substring(i, i + 4))
        }
        setCardNumber(parts.join(' '))
    }

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 4)
        if (v.length >= 2) {
            v = v.substring(0, 2) + '/' + v.substring(2)
        }
        setExpiry(v)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        onSave({
            last4: cardNumber.replace(/\s/g, '').slice(-4),
            brand: 'mastercard', // Simplified for demo
            expiry
        })
        setLoading(false)
        resetForm()
        onClose()
    }

    const resetForm = () => {
        setCardNumber('')
        setHolderName('')
        setExpiry('')
        setCvv('')
        setIsFlipped(false)
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                >
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Adicionar Cartão</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Interactive Card Preview */}
                        <div className="perspective-1000 relative h-48 w-full transition-transform duration-500">
                            <motion.div
                                className="w-full h-full relative preserve-3d transition-all duration-500"
                                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                            >
                                {/* Front */}
                                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="w-10 h-6 bg-yellow-400/20 rounded border border-yellow-400/40" />
                                        <div className="text-xl font-bold italic tracking-wider opacity-50">BANK</div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="text-2xl tracking-widest font-mono">
                                            {cardNumber || '•••• •••• •••• ••••'}
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-[10px] uppercase text-gray-400 tracking-wider">Titular</div>
                                                <div className="font-medium tracking-wide uppercase truncate max-w-[200px]">
                                                    {holderName || 'NOME DO TITULAR'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase text-gray-400 tracking-wider">Validade</div>
                                                <div className="font-medium tracking-wide">{expiry || 'MM/AA'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Back */}
                                <div
                                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg rotate-y-180"
                                    style={{ transform: 'rotateY(180deg)' }}
                                >
                                    <div className="w-full h-10 bg-black mt-6" />
                                    <div className="p-6">
                                        <div className="bg-white/10 p-2 rounded w-full text-right pr-4 mt-2">
                                            {cvv || '•••'}
                                        </div>
                                        <div className="mt-4 text-[10px] text-gray-400">
                                            CVV é o código de segurança de 3 dígitos no verso do cartão.
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-700">Número do Cartão</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        placeholder="0000 0000 0000 0000"
                                        className="pl-9 font-mono"
                                        maxLength={19}
                                        onFocus={() => setIsFlipped(false)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-700">Nome do Titular</label>
                                <Input
                                    value={holderName}
                                    onChange={(e) => setHolderName(e.target.value)}
                                    placeholder="Como está no cartão"
                                    className="uppercase"
                                    onFocus={() => setIsFlipped(false)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700">Validade</label>
                                    <Input
                                        value={expiry}
                                        onChange={handleExpiryChange}
                                        placeholder="MM/AA"
                                        maxLength={5}
                                        onFocus={() => setIsFlipped(false)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700">CVV</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                            placeholder="123"
                                            className="pl-9"
                                            maxLength={3}
                                            onFocus={() => setIsFlipped(true)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Validando...' : 'Salvar Cartão'}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
