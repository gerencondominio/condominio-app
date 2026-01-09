'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    ArrowLeft, User, Lock, CreditCard, Bell, Smartphone,
    HelpCircle, FileText, LogOut, Mail, Phone, Home,
    Settings, MapPin, ChevronRight, Moon
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import AvatarUpload from '@/components/profile/AvatarUpload'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface InfoCardProps {
    icon: any
    label: string
    value: string
    iconColor?: string
    iconBg?: string
}

function InfoCard({ icon: Icon, label, value, iconColor = 'text-indigo-600', iconBg = 'bg-indigo-50' }: InfoCardProps) {
    return (
        <div className="bg-white dark:bg-card rounded-2xl p-4 flex items-start gap-3 shadow-sm border border-stone-200 dark:border-border">
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
                <Icon className={cn("w-5 h-5", iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold uppercase tracking-wide">{label}</p>
                <p className="text-base font-semibold text-stone-900 dark:text-stone-100 mt-1 break-words">{value}</p>
            </div>
        </div>
    )
}

interface MenuItemProps {
    icon: any
    label: string
    href?: string
    onClick?: () => void
    iconColor?: string
    iconBg?: string
    showChevron?: boolean
}

function MenuItem({
    icon: Icon,
    label,
    href,
    onClick,
    iconColor = 'text-indigo-600',
    iconBg = 'bg-indigo-50',
    showChevron = true
}: MenuItemProps) {
    const className = cn(
        "w-full h-14 bg-white dark:bg-card rounded-2xl flex items-center justify-between px-4 transition-all",
        "active:scale-98 active:opacity-80 shadow-sm border border-stone-200 dark:border-border",
        "hover:bg-stone-50 dark:hover:bg-stone-800"
    )

    const content = (
        <>
            <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
                    <Icon className={cn("w-5 h-5", iconColor)} />
                </div>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{label}</span>
            </div>
            {showChevron && <ChevronRight className="w-5 h-5 text-stone-300 dark:text-stone-600" />}
        </>
    )

    if (href) {
        return (
            <Link href={href} className={className}>
                {content}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={className}>
            {content}
        </button>
    )
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null)

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

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.href = '/login'
    }

    // Obter iniciais do nome
    const getInitials = (name: string | null) => {
        if (!name) return 'U'
        const parts = name.split(' ')
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        }
        return name[0].toUpperCase()
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-background">
            {/* Header Fixo com Safe Area */}
            <header className="sticky top-0 z-50 bg-white dark:bg-card border-b border-stone-200 dark:border-border shadow-sm">
                <div className="flex items-center gap-4 px-4 h-14">
                    <Link href="/inicio" className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-lg font-bold text-stone-900 dark:text-stone-100">Perfil</h1>
                </div>
            </header>

            {/* Conteúdo Scrollável */}
            <main className="pb-28 space-y-6">
                {/* Card de Perfil Centralizado */}
                <section className="bg-white dark:bg-card border-b border-stone-200 dark:border-border shadow-sm">
                    <div className="px-6 py-8">
                        <div className="flex flex-col items-center text-center">
                            {/* Foto de Perfil com Upload */}
                            <AvatarUpload
                                currentAvatarUrl={profile?.avatar_url || null}
                                currentAvatarType={profile?.avatar_type || 'upload'}
                                currentGradient={profile?.avatar_gradient}
                                userId={profile?.id || ''}
                                userName={profile?.full_name || 'Usuário'}
                                onUploadSuccess={(url, type, gradient) => {
                                    setProfile({
                                        ...profile,
                                        avatar_url: url,
                                        avatar_type: type,
                                        avatar_gradient: gradient
                                    })
                                }}
                            />

                            {/* Nome e Informações */}
                            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-5">
                                {profile?.full_name || 'Carregando...'}
                            </h2>
                            <p className="text-sm text-stone-500 mt-1 flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                {profile?.lot_number ? `Unidade ${profile.lot_number}` : 'Sem unidade'}
                            </p>
                        </div>

                        {/* Botão Editar Perfil */}
                        <Link href="/perfil/editar">
                            <Button
                                className="w-full mt-6 h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold shadow-lg shadow-indigo-200 active:scale-98 transition-all"
                            >
                                Editar Perfil
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Informações Pessoais */}
                <section className="px-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 px-1">
                        Informações Pessoais
                    </h3>
                    <div className="space-y-3">
                        <InfoCard
                            icon={Mail}
                            label="Email"
                            value={profile?.email || 'não informado'}
                            iconColor="text-blue-600"
                            iconBg="bg-blue-50"
                        />
                        <InfoCard
                            icon={Phone}
                            label="Telefone"
                            value={profile?.phone || 'não informado'}
                            iconColor="text-green-600"
                            iconBg="bg-green-50"
                        />
                        <InfoCard
                            icon={Home}
                            label="Unidade"
                            value={profile?.lot_number ? `Lote ${profile.lot_number}` : 'não informado'}
                            iconColor="text-purple-600"
                            iconBg="bg-purple-50"
                        />
                    </div>
                </section>

                {/* Conta e Segurança */}
                <section className="px-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 px-1">
                        Conta e Segurança
                    </h3>
                    <div className="space-y-3">
                        <MenuItem
                            icon={User}
                            label="Dados Pessoais"
                            href="/perfil/dados-pessoais"
                            iconColor="text-indigo-600"
                            iconBg="bg-indigo-50"
                        />
                        <MenuItem
                            icon={Lock}
                            label="Segurança e Senha"
                            href="/perfil/seguranca"
                            iconColor="text-orange-600"
                            iconBg="bg-orange-50"
                        />
                        <MenuItem
                            icon={CreditCard}
                            label="Métodos de Pagamento"
                            href="/perfil/pagamento"
                            iconColor="text-emerald-600"
                            iconBg="bg-emerald-50"
                        />
                    </div>
                </section>

                {/* Preferências */}
                <section className="px-4">
                    <h3 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3 px-1">
                        Preferências
                    </h3>
                    <div className="space-y-3">
                        {/* Modo Escuro */}
                        <div className="bg-white dark:bg-card rounded-2xl p-4 flex items-center justify-between shadow-sm border border-stone-200 dark:border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                    <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                </div>
                                <span className="font-semibold text-stone-900 dark:text-stone-100">Modo Escuro</span>
                            </div>
                            <ThemeToggle />
                        </div>

                        <MenuItem
                            icon={Bell}
                            label="Notificações"
                            href="/perfil/notificacoes"
                            iconColor="text-yellow-600"
                            iconBg="bg-yellow-50 dark:bg-yellow-900/20"
                        />
                        <MenuItem
                            icon={Settings}
                            label="Configurações"
                            href="/perfil/configuracoes"
                            iconColor="text-slate-600 dark:text-slate-400"
                            iconBg="bg-slate-50 dark:bg-slate-800"
                        />
                    </div>
                </section>

                {/* Suporte */}
                <section className="px-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 px-1">
                        Suporte
                    </h3>
                    <div className="space-y-3">
                        <MenuItem
                            icon={HelpCircle}
                            label="Central de Ajuda"
                            href="https://wa.me/554398662506"
                            iconColor="text-green-600"
                            iconBg="bg-green-50"
                        />
                        <MenuItem
                            icon={FileText}
                            label="Termos e Condições"
                            href="#"
                            iconColor="text-gray-600"
                            iconBg="bg-gray-50"
                        />
                    </div>
                </section>

                {/* Botão de Logout */}
                <section className="px-4 pt-2">
                    <button
                        onClick={handleLogout}
                        className="w-full h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all active:scale-98 active:opacity-80 hover:bg-red-100 shadow-sm border border-red-100"
                    >
                        <LogOut className="w-5 h-5" />
                        Sair da Conta
                    </button>
                </section>

                {/* Versão do App */}
                <section className="px-4 pb-4">
                    <p className="text-center text-xs text-stone-400">
                        Versão 2.4.0 (Build 302)
                    </p>
                </section>
            </main>
        </div>
    )
}
