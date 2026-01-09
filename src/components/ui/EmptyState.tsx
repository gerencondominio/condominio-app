import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
    title: string
    description: string
    icon: LucideIcon
    action?: React.ReactNode
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 bg-white/50 rounded-2xl border-2 border-dashed border-gray-100">
            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center">
                <Icon className="h-8 w-8 text-gray-300" />
            </div>
            <div className="space-y-1 max-w-xs">
                <h3 className="text-gray-900 font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            {action && (
                <div className="pt-2">
                    {action}
                </div>
            )}
        </div>
    )
}
