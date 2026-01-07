'use client'

import { Zap, Video, DoorClosed, PenTool, Dumbbell, Wifi, Camera, Droplet, Sun, Wind, Leaf, Wrench, Shield, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

const AVAILABLE_ICONS = [
    { id: 'zap', icon: Zap, label: 'Iluminação', color: 'text-blue-600' },
    { id: 'video', icon: Video, label: 'Câmera', color: 'text-purple-600' },
    { id: 'door', icon: DoorClosed, label: 'Portão', color: 'text-green-600' },
    { id: 'pen', icon: PenTool, label: 'Pintura', color: 'text-gray-600' },
    { id: 'gym', icon: Dumbbell, label: 'Academia', color: 'text-orange-600' },
    { id: 'wifi', icon: Wifi, label: 'Internet', color: 'text-indigo-600' },
    { id: 'camera', icon: Camera, label: 'Foto', color: 'text-pink-600' },
    { id: 'water', icon: Droplet, label: 'Água', color: 'text-cyan-600' },
    { id: 'sun', icon: Sun, label: 'Solar', color: 'text-yellow-600' },
    { id: 'wind', icon: Wind, label: 'Ventilação', color: 'text-teal-600' },
    { id: 'leaf', icon: Leaf, label: 'Jardim', color: 'text-emerald-600' },
    { id: 'wrench', icon: Wrench, label: 'Manutenção', color: 'text-amber-600' },
    { id: 'shield', icon: Shield, label: 'Segurança', color: 'text-red-600' },
    { id: 'lock', icon: Lock, label: 'Acesso', color: 'text-slate-600' },
]

interface IconCarouselProps {
    selectedIcon: string
    onSelectIcon: (iconId: string) => void
}

export function IconCarousel({ selectedIcon, onSelectIcon }: IconCarouselProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Ícone da Melhoria</label>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {AVAILABLE_ICONS.map((item) => {
                    const Icon = item.icon
                    const isSelected = selectedIcon === item.id

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onSelectIcon(item.id)}
                            className={cn(
                                "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all min-w-[80px] hover:scale-105",
                                isSelected
                                    ? "border-blue-500 bg-blue-50 shadow-md"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                isSelected ? "bg-white" : "bg-gray-50"
                            )}>
                                <Icon className={cn("h-5 w-5", item.color)} />
                            </div>
                            <span className={cn(
                                "text-xs font-medium",
                                isSelected ? "text-blue-600" : "text-gray-600"
                            )}>
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export function getIconComponent(iconId: string) {
    const iconData = AVAILABLE_ICONS.find(i => i.id === iconId)
    return iconData || AVAILABLE_ICONS[0]
}
