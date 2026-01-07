import Link from 'next/link'
import { ArrowLeft, Droplets, MessageSquare, FileText, Heart, Package, PaintBucket, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function NotificationsPage() {
    const sections = [
        {
            title: 'Novo',
            items: [
                {
                    type: 'admin',
                    icon: Droplets,
                    color: 'bg-red-100 text-red-500',
                    text: <span><strong>Administração</strong> emitiu um aviso urgente: Corte de água programado para amanhã às 09:00.</span>,
                    time: '2 min',
                    read: false,
                    hasArrow: true
                },
                {
                    type: 'comment',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60', // Mock
                    text: <span><strong>Maria (Apt 302)</strong> comentou na sua sugestão de melhoria da academia: "Adorei a ideia!"</span>,
                    time: '15 min',
                    read: false,
                    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100' // Mock thumbnail
                }
            ]
        },
        {
            title: 'Hoje',
            items: [
                {
                    type: 'financial',
                    icon: FileText,
                    color: 'bg-blue-100 text-blue-500',
                    text: <span><strong>Financeiro</strong>: Seu boleto mensal vence hoje. Evite juros.</span>,
                    time: '3h',
                    action: 'Pagar'
                },
                {
                    type: 'like',
                    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100', // Mock
                    text: <span><strong>João (Apt 104)</strong> curtiu seu aviso sobre o barulho.</span>,
                    time: '5h',
                    iconOverlap: Heart
                }
            ]
        },
        {
            title: 'Esta Semana',
            items: [
                {
                    type: 'vote',
                    icon: PaintBucket,
                    color: 'bg-purple-100 text-purple-500',
                    text: <span>Nova votação disponível: <strong>Pintura da Fachada (Cor)</strong>. Participe!</span>,
                    time: '2 d',
                    hasArrow: true
                },
                {
                    type: 'package',
                    icon: Package,
                    color: 'bg-orange-100 text-orange-500',
                    text: <span>Encomenda recebida na portaria. Código de retirada: <span className="bg-gray-100 px-1 rounded border border-gray-200 font-mono text-xs">#8291</span></span>,
                    time: '3 d'
                }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/inicio" className="text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-900">Notificações</h1>
                </div>
                <button className="text-sm font-semibold text-blue-600 hover:underline">
                    Ler tudo
                </button>
            </header>

            <div className="p-6 max-w-md mx-auto space-y-6">
                {sections.map((section) => (
                    <div key={section.title} className="space-y-4">
                        <h2 className="text-sm font-bold text-gray-900">{section.title}</h2>
                        <div className="space-y-4">
                            {section.items.map((item: any, idx) => (
                                <div key={idx} className="flex gap-4 cursor-pointer group hover:bg-white/50 p-2 rounded-xl transition-colors -mx-2">
                                    <div className="relative flex-shrink-0">
                                        {item.avatar ? (
                                            <img src={item.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-100" alt="" />
                                        ) : (
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}>
                                                <item.icon className="h-6 w-6" />
                                            </div>
                                        )}

                                        {/* Status Dot */}
                                        {(item.read === false) && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-600 border-2 border-white rounded-full"></span>
                                        )}
                                        {item.iconOverlap && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center border border-white">
                                                <Heart className="h-3 w-3 text-red-500 fill-current" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm text-gray-800 leading-snug">{item.text}</p>
                                        <p className="text-xs text-gray-400 font-medium">{item.time}</p>

                                        {item.action && (
                                            <Button variant="secondary" size="sm" className="h-7 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 mt-2">
                                                {item.action}
                                            </Button>
                                        )}
                                    </div>

                                    {item.image && (
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                                        </div>
                                    )}

                                    {item.hasArrow && (
                                        <div className="flex-shrink-0 flex items-center">
                                            <ChevronRight className="h-5 w-5 text-gray-300" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
