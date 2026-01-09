'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { createPost } from './actions'

import { useToast } from '@/components/ui/Toast'

export function CreatePostForm() {
    const [content, setContent] = useState('')
    const [selectedType, setSelectedType] = useState('Sugestão')
    const [isPending, setIsPending] = useState(false)
    const { addToast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        setIsPending(true)
        const result = await createPost(content, selectedType)

        if (result?.error) {
            addToast({
                title: 'Erro ao criar post',
                description: result.error,
                type: 'error'
            })
            setIsPending(false)
            return
        }

        addToast({
            title: 'Post criado com sucesso!',
            description: 'Sua mensagem foi enviada para a comunidade.',
            type: 'success'
        })

        setContent('')
        setIsPending(false)
    }

    return (
        <form onSubmit={handleSubmit} className="relative space-y-3">
            {/* Tag Selection */}
            <div className="flex gap-2 px-1">
                {['Manutenção', 'Reclamação', 'Sugestão'].map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${selectedType === type
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="relative">
                <div className="absolute left-3 top-3 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                    VC
                </div>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`Escreva sua ${selectedType.toLowerCase()}...`}
                    className="w-full pl-14 pr-12 py-4 rounded-2xl border-none shadow-sm text-sm focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={isPending}
                />
                <button
                    type="submit"
                    disabled={isPending || !content.trim()}
                    className="absolute right-3 top-2.5 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </form>
    )
}
