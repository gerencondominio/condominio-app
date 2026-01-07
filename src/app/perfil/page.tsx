'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Lock, CreditCard, ChevronRight, Bell, Smartphone, HelpCircle, FileText, LogOut, Edit2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

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

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <header className="lg:hidden p-6 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-10">
                <Link href="/inicio" className="text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-lg font-bold text-gray-900">Configurações</h1>
            </header>

            <div className="p-6 max-w-md lg:max-w-5xl mx-auto space-y-6 lg:space-y-0">

                {/* Desktop Title */}
                <h1 className="hidden lg:block text-2xl font-bold text-gray-900 mb-6">Configurações do Perfil</h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">

                    {/* Left Column */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* User Card */}
                        <Card className="p-4 bg-blue-600 border-none text-white shadow-lg shadow-blue-200 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30">
                                    {profile?.full_name ? (
                                        <span className="text-white font-bold text-2xl">{profile.full_name[0]}</span>
                                    ) : (
                                        <User className="h-8 w-8 text-white" />
                                    )}
                                    {/* <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" className="w-full h-full object-cover" alt="Profile" /> */}
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg">{profile?.full_name || 'Carregando...'}</h2>
                                    <p className="text-blue-100 text-sm">{profile?.lot_number ? `Unidade ${profile.lot_number}` : '...'}</p>
                                </div>
                            </div>
                            <Button size="sm" className="h-8 bg-white/20 hover:bg-white/30 text-white border-none">
                                Editar
                            </Button>
                        </Card>

                        {/* Account Settings */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Conta</h3>
                            <Card className="divide-y divide-gray-50 overflow-hidden">
                                <MenuItem icon={User} label="Dados Pessoais" href="/perfil/dados-pessoais" />
                                <MenuItem icon={Lock} label="Segurança e Senha" href="/perfil/seguranca" />
                                <MenuItem icon={CreditCard} label="Métodos de Pagamento" href="/perfil/pagamento" />
                            </Card>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Preferences */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Preferências</h3>
                            <Card className="divide-y divide-gray-50 overflow-hidden">
                                <div className="flex items-center justify-between p-4 bg-white">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                                            <Bell className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium text-gray-700">Notificações Push</span>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                                            <Smartphone className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium text-gray-700">Entrar com Face ID</span>
                                    </div>
                                    <Switch />
                                </div>
                            </Card>
                        </div>

                        {/* Support */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Suporte</h3>
                            <Card className="divide-y divide-gray-50 overflow-hidden">
                                <MenuItem icon={HelpCircle} label="Central de Ajuda" href="#" iconColor="text-green-500" iconBg="bg-green-50" />
                                <MenuItem icon={FileText} label="Termos e Condições" href="#" iconColor="text-gray-500" iconBg="bg-gray-100" />
                            </Card>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full py-6 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                            onClick={async () => {
                                const supabase = createClient()
                                await supabase.auth.signOut()
                                window.location.href = '/login'
                            }}
                        >
                            <LogOut className="mr-2 h-5 w-5" />
                            Sair da Conta
                        </Button>

                        <p className="text-center text-xs text-gray-400 pt-4">Versão 2.4.0 (Build 302)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MenuItem({ icon: Icon, label, href, iconColor = "text-blue-500", iconBg = "bg-blue-50" }: any) {
    return (
        <Link href={href} className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-gray-700">{label}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300" />
        </Link>
    )
}
