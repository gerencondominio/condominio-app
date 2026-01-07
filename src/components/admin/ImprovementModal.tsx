'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { IconCarousel } from '@/components/ui/IconCarousel'

interface ImprovementModalProps {
    open: boolean
    onClose: () => void
    onSave: (data: ImprovementFormData) => Promise<void>
    initialData?: ImprovementFormData | null
}

export interface ImprovementFormData {
    id?: string
    title: string
    description: string
    amount: number
    progress: number
    status: string
    icon: string
}

const STATUS_OPTIONS = [
    { value: 'Aprovado', label: 'Aprovado', color: 'bg-green-100 text-green-700' },
    { value: 'Em análise', label: 'Em análise', color: 'bg-amber-100 text-amber-700' },
    { value: 'Planejado', label: 'Planejado', color: 'bg-blue-100 text-blue-700' },
    { value: 'Fila', label: 'Fila', color: 'bg-gray-100 text-gray-700' },
]

export function ImprovementModal({ open, onClose, onSave, initialData }: ImprovementModalProps) {
    const [formData, setFormData] = useState<ImprovementFormData>({
        title: '',
        description: '',
        amount: 0,
        progress: 0,
        status: 'Fila',
        icon: 'zap',
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                title: '',
                description: '',
                amount: 0,
                progress: 0,
                status: 'Fila',
                icon: 'zap',
            })
        }
    }, [initialData, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await onSave(formData)
            onClose()
        } catch (error) {
            console.error('Error saving improvement:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} title={initialData ? 'Editar Melhoria' : 'Nova Melhoria'}>
            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Nome da Melhoria"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Iluminação Nova"
                    required
                />

                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Comentário</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descrição da melhoria..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Valor (R$)"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                        placeholder="5000"
                        required
                        min="0"
                        step="0.01"
                    />

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Progresso (%)</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.progress}
                            onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="text-center text-sm font-semibold text-blue-600 mt-1">
                            {formData.progress}%
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                    <div className="grid grid-cols-2 gap-2">
                        {STATUS_OPTIONS.map((status) => (
                            <button
                                key={status.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, status: status.value })}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${formData.status === status.value
                                        ? status.color + ' ring-2 ring-offset-2 ring-blue-500'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {status.label}
                            </button>
                        ))}
                    </div>
                </div>

                <IconCarousel
                    selectedIcon={formData.icon}
                    onSelectIcon={(icon) => setFormData({ ...formData, icon })}
                />

                <div className="flex gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="flex-1"
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Salvando...' : 'Salvar'}
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}
