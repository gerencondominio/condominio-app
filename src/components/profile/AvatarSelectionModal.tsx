'use client'

import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { DEFAULT_AVATARS } from '@/lib/avatars'
import { cn } from '@/lib/utils'

interface AvatarSelectionModalProps {
    open: boolean
    onClose: () => void
    onSelect: (avatarId: string) => void
}

export function AvatarSelectionModal({ open, onClose, onSelect }: AvatarSelectionModalProps) {
    return (
        <Dialog open={open} onClose={onClose} title="Escolher Avatar">
            <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                    {DEFAULT_AVATARS.map((avatar) => (
                        <button
                            key={avatar.id}
                            onClick={() => onSelect(avatar.id)}
                            className={cn(
                                "aspect-square rounded-full transition-transform hover:scale-105 active:scale-95 ring-2 ring-transparent hover:ring-indigo-500",
                                avatar.preview
                            )}
                            aria-label={`Selecionar avatar ${avatar.id}`}
                        />
                    ))}
                </div>

                <div>
                    <Button variant="outline" onClick={onClose} className="w-full">
                        Cancelar
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}
