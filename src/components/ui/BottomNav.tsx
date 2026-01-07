'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Wallet, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
    const pathname = usePathname()

    const items = [
        { href: '/inicio', label: 'Início', icon: Home },
        { href: '/pagamentos', label: 'Pagamentos', icon: Wallet },
        { href: '/comunidade', label: 'Comunidade', icon: Users },
        { href: '/perfil', label: 'Perfil', icon: User },
    ]

    // Hide on auth pages
    if (['/login', '/cadastro'].includes(pathname)) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-2 px-6 h-20 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-colors relative min-w-[64px]",
                                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {isActive && (
                                <span className="absolute -top-3 w-8 h-1 bg-blue-600 rounded-b-lg"></span>
                            )}
                            <Icon className={cn("h-6 w-6 mt-1", isActive && "fill-current/10")} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
