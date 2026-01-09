'use client'

import { useState } from 'react'
import { MoreHorizontal, MessageSquare, ThumbsUp, Send } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { toggleLike, addComment, getComments } from '@/app/comunidade/actions'
import { Input } from '@/components/ui/Input'
import confetti from 'canvas-confetti'

export function PostCard({ post }: { post: any }) {
    const [isHearted, setIsHearted] = useState(post.likedByMe)
    const [likesCount, setLikesCount] = useState(post.likes)
    const [commentsCount, setCommentsCount] = useState(post.comments)
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState<any[]>([])
    const [newComment, setNewComment] = useState('')
    const [loadingComments, setLoadingComments] = useState(false)

    const handleLike = async (e: React.MouseEvent) => {
        // Prevent event bubbling if needed, though button is clickable
        // Optimistic UI
        const newIsHearted = !isHearted
        setIsHearted(newIsHearted)
        setLikesCount((prev: number) => newIsHearted ? prev + 1 : prev - 1)

        if (newIsHearted) {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                origin: { x, y },
                particleCount: 40,
                spread: 60,
                startVelocity: 20,
                colors: ['#3b82f6', '#ef4444', '#f59e0b'], // Blue, Red, Amber
                disableForReducedMotion: true,
                scalar: 0.6 // Smaller particles
            })
        }

        await toggleLike(post.id)
    }

    const handleToggleComments = async () => {
        if (!showComments) {
            setLoadingComments(true)
            const data = await getComments(post.id)
            setComments(data)
            setLoadingComments(false)
        }
        setShowComments(!showComments)
    }

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return

        // Optimistic add (partial)
        const comment = {
            id: 'temp-' + Date.now(),
            author: 'Você',
            content: newComment,
            created_at: new Date().toISOString()
        }
        setComments([...comments, comment])
        setNewComment('')
        setCommentsCount((prev: number) => prev + 1)

        await addComment(post.id, comment.content)
        // Refresh comments to get real ID and data
        const data = await getComments(post.id)
        setComments(data)
    }

    return (
        <Card className={`p-4 space-y-3 ${post.isAdmin ? 'border-red-100 bg-red-50/30' : ''}`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs overflow-hidden ${post.isAdmin ? 'bg-red-500' : 'bg-gray-300'}`}>
                        <span>{post.author.substring(0, 2).toUpperCase()}</span>
                    </div>

                    <div>
                        <h3 className="font-semibold text-sm text-gray-900 flex items-center gap-1">
                            {post.author}
                            {post.isAdmin && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">Admin</span>}
                        </h3>
                        <p className="text-xs text-gray-500" suppressHydrationWarning>
                            {new Date(post.time).toLocaleDateString()} • {post.location}
                        </p>
                    </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                </button>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
            </p>

            <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`text-[10px] font-normal ${post.type === 'suggestion' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                    post.type === 'maintenance' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                        post.type === 'complaint' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                            'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {post.type === 'suggestion' ? 'Sugestão' :
                        post.type === 'maintenance' ? 'Manutenção' :
                            post.type === 'complaint' ? 'Reclamação' :
                                post.type === 'notice' ? 'Aviso' : 'Geral'}
                </Badge>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={`h-8 px-2 gap-1.5 text-xs ${isHearted ? 'text-red-500' : 'text-gray-500'}`}
                    >
                        <ThumbsUp className={`h-4 w-4 ${isHearted ? 'fill-current' : ''}`} />
                        {likesCount}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToggleComments}
                        className="h-8 px-2 gap-1.5 text-xs text-gray-500"
                    >
                        <MessageSquare className="h-4 w-4" />
                        {commentsCount} comentários
                    </Button>
                </div>
            </div>

            {showComments && (
                <div className="pt-2 space-y-4 border-t border-gray-100 mt-2">
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {loadingComments ? (
                            <p className="text-sm text-gray-500 text-center">Carregando comentários...</p>
                        ) : comments.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center">Nenhum comentário ainda. Seja o primeiro!</p>
                        ) : (
                            comments.map((comment: any) => (
                                <div key={comment.id} className="flex gap-3 items-start bg-blue-50/40 p-3 rounded-xl border border-blue-100/50">
                                    <div className="min-w-8 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
                                        {comment.author.substring(0, 1).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline gap-2 mb-1">
                                            <span className="text-sm font-bold text-blue-900 truncate">{comment.author}</span>
                                            <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-400 flex-shrink-0" suppressHydrationWarning>
                                                {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(comment.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-800 leading-relaxed break-words">{comment.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handleAddComment} className="flex gap-2">
                        <Input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escreva um comentário..."
                            className="h-10 text-sm"
                        />
                        <Button
                            type="submit"
                            size="sm"
                            className={`h-10 w-10 p-0 rounded-lg transition-all ${newComment.trim() ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 bg-gray-50'}`}
                            disabled={!newComment.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            )}
        </Card>
    )
}
