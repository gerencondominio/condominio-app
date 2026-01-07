'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ImprovementModal, type ImprovementFormData } from '@/components/admin/ImprovementModal'
import { saveImprovement, deleteImprovement } from './actions'
import { getIconComponent } from '@/components/ui/IconCarousel'

interface Improvement {
    id: string
    title: string
    description: string
    amount: number
    current_amount: number
    status: string
    icon: string
}

interface ImprovementsSectionProps {
    improvements: Improvement[]
    isAdmin: boolean
}

export function ImprovementsSection({ improvements, isAdmin }: ImprovementsSectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showCompleted, setShowCompleted] = useState(false)
    const [editingImprovement, setEditingImprovement] = useState<ImprovementFormData | null>(null)

    const activeImprovements = improvements.filter(imp => {
        const progress = imp.amount > 0 ? (imp.current_amount / imp.amount) * 100 : 0
        return progress < 100
    })

    const completedImprovements = improvements.filter(imp => {
        const progress = imp.amount > 0 ? (imp.current_amount / imp.amount) * 100 : 0
        return progress >= 100
    })

    const handleAddNew = () => {
        setEditingImprovement(null)
        setIsModalOpen(true)
    }

    const handleEdit = (improvement: Improvement) => {
        const progress = improvement.amount > 0
            ? Math.round((improvement.current_amount / improvement.amount) * 100)
            : 0

        setEditingImprovement({
            id: improvement.id,
            title: improvement.title,
            description: improvement.description || '',
            amount: improvement.amount,
            progress,
            status: improvement.status,
            icon: improvement.icon,
        })
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja deletar esta melhoria?')) {
            await deleteImprovement(id)
            window.location.reload()
        }
    }

    const handleSave = async (data: ImprovementFormData) => {
        await saveImprovement(data)
        setIsModalOpen(false)
        window.location.reload()
    }

    return (
        <div className="lg:col-span-5 space-y-4 mt-8 lg:mt-0">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Próximas Melhorias</h3>
                <div className="flex gap-2">
                    {isAdmin && (
                        <Button
                            size="sm"
                            onClick={handleAddNew}
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Adicionar
                        </Button>
                    )}
                </div>
            </div>

            {/* Active Improvement Items */}
            <div className="space-y-4">
                {activeImprovements.length === 0 && completedImprovements.length === 0 ? (
                    <Card className="p-8 text-center">
                        <p className="text-gray-500">Nenhuma melhoria cadastrada ainda.</p>
                        {isAdmin && (
                            <Button onClick={handleAddNew} className="mt-4">
                                Adicionar Primeira Melhoria
                            </Button>
                        )}
                    </Card>
                ) : (
                    activeImprovements.length > 0 ? (
                        activeImprovements.map((improvement) => (
                            <ImprovementItem
                                key={improvement.id}
                                improvement={improvement}
                                isAdmin={isAdmin}
                                onEdit={() => handleEdit(improvement)}
                                onDelete={() => handleDelete(improvement.id)}
                            />
                        ))
                    ) : (
                        completedImprovements.length > 0 && !showCompleted && (
                            <p className="text-sm text-center text-gray-500 py-4 bg-white rounded-xl border border-dashed border-gray-200">
                                Todas as melhorias atuais foram concluídas! 🎉
                            </p>
                        )
                    )
                )}
            </div>

            {/* Completed Improvements Section (Suspensa/Colapsável) */}
            {completedImprovements.length > 0 && (
                <div className="pt-2">
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        className="flex items-center justify-between w-full p-4 bg-blue-50/50 hover:bg-blue-50 text-blue-700 rounded-xl transition-colors group"
                    >
                        <span className="font-bold text-sm">Melhorias Concluídas ({completedImprovements.length})</span>
                        <div className={`transform transition-transform duration-200 ${showCompleted ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </button>

                    {showCompleted && (
                        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {completedImprovements.map((improvement) => (
                                <ImprovementItem
                                    key={improvement.id}
                                    improvement={improvement}
                                    isAdmin={isAdmin}
                                    onEdit={() => handleEdit(improvement)}
                                    onDelete={() => handleDelete(improvement.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <ImprovementModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingImprovement}
            />
        </div>
    )
}

function ImprovementItem({
    improvement,
    isAdmin,
    onEdit,
    onDelete
}: {
    improvement: Improvement
    isAdmin: boolean
    onEdit: () => void
    onDelete: () => void
}) {
    const statusMap: any = {
        'Aprovado': 'bg-green-100 text-green-700',
        'Em análise': 'bg-amber-100 text-amber-700',
        'Planejado': 'bg-blue-100 text-blue-700',
        'Fila': 'bg-gray-100 text-gray-700',
    }
    const badgeColor = statusMap[improvement.status] || 'bg-gray-100'
    const progress = improvement.amount > 0
        ? Math.round((improvement.current_amount / improvement.amount) * 100)
        : 0

    const iconData = getIconComponent(improvement.icon)
    const Icon = iconData.icon

    return (
        <Card className="p-4 space-y-3 relative group">
            {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        title="Deletar"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            <div className="flex items-start justify-between">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50">
                        <Icon className={`h-5 w-5 ${iconData.color}`} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{improvement.title}</h4>
                        <p className="text-xs text-gray-500">{improvement.description}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm" suppressHydrationWarning>
                        R$ {improvement.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full block mt-1 text-center ${badgeColor}`}>
                        {improvement.status}
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-medium text-gray-500">
                    <span>Progresso da meta</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-blue-600' : iconData.color.replace('text-', 'bg-')}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </Card>
    )
}
