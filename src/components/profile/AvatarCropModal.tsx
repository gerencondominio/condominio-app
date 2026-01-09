'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from '@/components/ui/Button'
import { X, ZoomIn, ZoomOut, Scissors } from 'lucide-react'
import getCroppedImg from '@/lib/cropImage'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AvatarCropModalProps {
    imageUrl: string
    onCropComplete: (croppedImage: Blob) => void
    onClose: () => void
    open: boolean
}

export function AvatarCropModal({ imageUrl, onCropComplete, onClose, open }: AvatarCropModalProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [loading, setLoading] = useState(false)

    const onCropChange = (crop: any) => {
        setCrop(crop)
    }

    const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const createCroppedImage = async () => {
        if (!croppedAreaPixels) return

        try {
            setLoading(true)
            const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels)
            onCropComplete(croppedBlob)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-stone-800 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                            <span className="text-white font-medium drop-shadow-md">Ajustar Foto</span>
                            <button onClick={onClose} className="text-white/80 hover:text-white pointer-events-auto">
                                <X className="h-5 w-5 drop-shadow-md" />
                            </button>
                        </div>

                        <div className="relative h-[400px] w-full bg-black">
                            <Cropper
                                image={imageUrl}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={onCropChange}
                                onCropComplete={onCropCompleteHandler}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <ZoomOut className="w-4 h-4 text-stone-500" />
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="flex-1 h-1 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <ZoomIn className="w-4 h-4 text-stone-500" />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="flex-1 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={createCroppedImage}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                                    disabled={loading}
                                >
                                    <Scissors className="w-4 h-4" />
                                    {loading ? 'Cortando...' : 'Cortar e Salvar'}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
