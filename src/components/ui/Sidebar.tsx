'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Wallet, Users, User, LogOut, Settings, Bell, Trophy, Building2, Map } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export function Sidebar() {
    const pathname = usePathname()
    const [profile, setProfile] = useState<any>(null)

    const items = [
        { href: '/inicio', label: 'Início', icon: Home },
        { href: '/pagamentos', label: 'Pagamentos', icon: Wallet },
        { href: '/ranking', label: 'Ranking', icon: Trophy },
        { href: '/mapa', label: 'Mapa', icon: Map },
        { href: '/notificacoes', label: 'Notificações', icon: Bell },
        { href: '/comunidade', label: 'Comunidade', icon: Users },
        { href: '/perfil', label: 'Perfil', icon: User },
    ]

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (data) setProfile(data)
            }
        }
        fetchProfile()
    }, [])

    // Hide on auth pages
    if (['/login', '/cadastro', '/forgot-password', '/reset-password'].includes(pathname)) {
        return null
    }

    return (
        <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-card border-r border-gray-100 dark:border-border h-screen fixed left-0 top-0 z-50">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-none">Condo<span className="text-blue-600 dark:text-blue-400">App</span></h1>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium tracking-wider uppercase mt-0.5">Premium Living</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold shadow-sm"
                                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                                )}
                            >
                                <Icon className={cn("h-5 w-5", isActive && "fill-current/10")} />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-gray-100 dark:border-border space-y-4">
                <Link href="/perfil" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">
                        {profile?.full_name ? (
                            <span className="text-blue-600 font-bold text-lg">{profile.full_name[0]}</span>
                        ) : (
                            <User className="h-5 w-5 text-blue-600" />
                        )}
                        {/* <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" className="w-full h-full object-cover" alt="Profile" /> */}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{profile?.full_name || 'Usuário'}</p>
                        <p className="text-xs text-gray-500 truncate">{profile?.lot_number ? `Unidade ${profile.lot_number}` : 'Carregando...'}</p>
                    </div>
                    <Settings className="h-4 w-4 text-gray-400" />
                </Link>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                    onClick={async () => {
                        const supabase = createClient()
                        await supabase.auth.signOut()
                        window.location.href = '/login' // Hard refresh is safer to clear all states
                    }}
                >
                    <LogOut className="h-4 w-4" />
                    Sair
                </Button>
            </div>
        </div>
    )
}
