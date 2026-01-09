'use client'

import { useState, useRef } from 'react'
import { Camera, Loader2, Upload, X, Palette, Scissors } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { AvatarCropModal } from './AvatarCropModal'
import { AvatarSelectionModal } from './AvatarSelectionModal'
import { getAvatarGradient } from '@/lib/avatars'

interface AvatarUploadProps {
    currentAvatarUrl: string | null
    currentAvatarType?: 'upload' | 'gradient'
    currentGradient?: string
    userId: string
    userName: string
    onUploadSuccess: (url: string, type: 'upload' | 'gradient', gradient?: string) => void
    className?: string
}

export default function AvatarUpload({
    currentAvatarUrl,
    currentAvatarType = 'upload',
    currentGradient,
    userId,
    userName,
    onUploadSuccess,
    className
}: AvatarUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    // Crop state
    const [showCropModal, setShowCropModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string>('')

    // Default Avatar state
    const [showSelectionModal, setShowSelectionModal] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const getInitials = (name: string) => {
        if (!name) return 'U'
        const parts = name.split(' ')
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        }
        return name[0].toUpperCase()
    }

    const validateFile = (file: File): string | null => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validTypes.includes(file.type)) return 'Formato inválido'
        if (file.size > 2 * 1024 * 1024) return 'Máximo 2MB'
        return null
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setError('')
        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            return
        }

        // Open crop modal
        const reader = new FileReader()
        reader.onloadend = () => {
            setSelectedImage(reader.result as string)
            setShowCropModal(true)
            // Reset input so same file can be selected again
            event.target.value = ''
        }
        reader.readAsDataURL(file)
    }

    const handleCropComplete = async (croppedBlob: Blob) => {
        setShowCropModal(false)

        // Convert blob to file
        const file = new File([croppedBlob], 'avatar.jpg', { type: 'image/jpeg' })
        uploadAvatar(file)
    }

    const uploadAvatar = async (file: File) => {
        setUploading(true)
        setError('')

        try {
            const supabase = createClient()
            const fileName = `${userId}/avatar-${Date.now()}.jpg`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true })

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName)

            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    avatar_url: publicUrl,
                    avatar_type: 'upload',
                    avatar_gradient: null
                })
                .eq('id', userId)

            if (updateError) throw updateError

            onUploadSuccess(publicUrl, 'upload')
            setPreviewUrl(null)

        } catch (err: any) {
            console.error(err)
            setError('Erro ao fazer upload')
        } finally {
            setUploading(false)
        }
    }

    const handleDefaultSelect = async (avatarId: string) => {
        setShowSelectionModal(false)
        setUploading(true)

        try {
            const supabase = createClient()
            const gradient = getAvatarGradient(avatarId)

            const { error } = await supabase
                .from('profiles')
                .update({
                    avatar_type: 'gradient',
                    avatar_gradient: avatarId,
                    // Keep avatar_url just in case or clear it? Better to keep history or irrelevant.
                })
                .eq('id', userId)

            if (error) throw error

            onUploadSuccess('', 'gradient', avatarId)

        } catch (err: any) {
            setError('Erro ao salvar avatar')
        } finally {
            setUploading(false)
        }
    }

    const triggerFileSelect = () => fileInputRef.current?.click()

    // Determine what to show
    const showGradient = currentAvatarType === 'gradient' && currentGradient
    const activeGradientClass = showGradient ? getAvatarGradient(currentGradient) : ''
    const activeImageUrl = previewUrl || currentAvatarUrl

    return (
        <div className={cn("relative flex flex-col items-center gap-3", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
            />

            {/* Main Avatar Circle */}
            <div
                onClick={triggerFileSelect}
                className={cn(
                    "w-28 h-28 rounded-full relative group cursor-pointer transition-all",
                    uploading && "opacity-50 cursor-not-allowed"
                )}
            >
                {showGradient ? (
                    <div className={cn(
                        "w-full h-full rounded-full flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-stone-800",
                        activeGradientClass
                    )}>
                        <span className="text-white font-black text-3xl shadow-sm">
                            {getInitials(userName)}
                        </span>
                    </div>
                ) : activeImageUrl ? (
                    <img
                        src={activeImageUrl}
                        alt={userName}
                        className="w-full h-full rounded-full object-cover ring-4 ring-white dark:ring-stone-800 shadow-xl"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-stone-800">
                        <span className="text-stone-400 font-black text-3xl">
                            {getInitials(userName)}
                        </span>
                    </div>
                )}

                {/* Overlays */}
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploading ? <Loader2 className="animate-spin text-white" /> : <Camera className="text-white" />}
                </div>

                {/* Edit Badge */}
                <div className="absolute bottom-1 right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-stone-800">
                    <Upload className="w-4 h-4 text-white" />
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => setShowSelectionModal(true)}
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
                >
                    <Palette className="w-3 h-3" />
                    Escolher Padrão
                </button>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            {/* Modals */}
            <AvatarCropModal
                open={showCropModal}
                imageUrl={selectedImage}
                onCropComplete={handleCropComplete}
                onClose={() => setShowCropModal(false)}
            />

            <AvatarSelectionModal
                open={showSelectionModal}
                onSelect={handleDefaultSelect}
                onClose={() => setShowSelectionModal(false)}
            />
        </div>
    )
}
