'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { createPost } from './actions'

export function CreatePostForm() {
    const [content, setContent] = useState('')
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        setIsPending(true)
        const result = await createPost(content, 'Sugestões')

        if (result?.error) {
            alert('Erro ao criar post: ' + result.error)
            setIsPending(false)
            return
        }

        setContent('')
        setIsPending(false)
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="absolute left-3 top-3 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                VC
            </div>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tem alguma sugestão para o condomínio?"
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
        </form>
    )
}
