import { Bell, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PostCard } from '@/components/community/PostCard'
import Link from 'next/link'
import { getPosts } from './actions'
import { CreatePostForm } from './CreatePostForm'
import { EmptyState } from '@/components/ui/EmptyState'
import { AnimatedItem } from '@/components/ui/AnimatedList'

export default async function CommunityPage(props: {
    searchParams?: Promise<{ filter?: string }>;
}) {
    const searchParams = await props.searchParams;
    const filter = searchParams?.filter || 'Tudo';
    const tabs = ['Tudo', 'Sugestões', 'Manutenção', 'Avisos']

    // Fetch real posts
    const posts = await getPosts(filter)

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header (Mobile) */}
            <header className="lg:hidden p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 transition-all duration-200 shadow-sm">
                <div className="flex items-center gap-4 w-full">
                    <Link href="/inicio" className="md:hidden">
                        {/* Space for back button if needed */}
                    </Link>
                    <h1 className="text-lg font-bold text-gray-900 flex-1 text-center">Comunidade</h1>
                    <Link href="/notificacoes">
                        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:bg-gray-100 rounded-full">
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                        </Button>
                    </Link>
                </div>
            </header>

            <div className="p-4 lg:p-8 space-y-6 max-w-md lg:max-w-6xl mx-auto">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Desktop Sidebar (Filters) */}
                    <div className="hidden lg:block lg:col-span-4 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Fórum da Comunidade</h2>
                            <p className="text-gray-500">Um espaço para sugestões, avisos e interação entre vizinhos.</p>
                        </div>

                        <Card className="p-4 space-y-2">
                            <h3 className="font-semibold text-gray-900 mb-2">Filtros</h3>
                            <div className="flex flex-col gap-2">
                                {tabs.map((tab) => {
                                    const isActive = tab === filter
                                    return (
                                        <Link
                                            key={tab}
                                            href={`/comunidade?filter=${tab}`}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors ${isActive ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-600'}`}
                                        >
                                            {tab}
                                        </Link>
                                    )
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* Main Feed Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Create Post Form */}
                        <div className="bg-white p-1 rounded-2xl shadow-sm">
                            <CreatePostForm />
                        </div>

                        {/* Mobile Tabs */}
                        <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {tabs.map((tab) => {
                                const isActive = tab === filter
                                return (
                                    <Link
                                        key={tab}
                                        href={`/comunidade?filter=${tab}`}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 border border-gray-100'}`}
                                    >
                                        {tab}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Feed */}
                        <div className="space-y-4">
                            {posts.length === 0 ? (
                                <EmptyState
                                    icon={MessageSquare}
                                    title="Nenhuma publicação"
                                    description={filter === 'Tudo' ? "Seja o primeiro a publicar algo para a comunidade!" : `Não há publicações em '${filter}' ainda.`}
                                />
                            ) : (
                                posts.map((post: any, index: number) => (
                                    <AnimatedItem key={post.id} index={index}>
                                        <PostCard post={post} />
                                    </AnimatedItem>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
