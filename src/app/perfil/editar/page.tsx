'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, User, MapPin, Calendar, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

export default function EditProfilePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        full_name: '',
        cpf: '',
        lot_number: '',
        birth_date: ''
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (error) throw error

                if (data) {
                    setFormData({
                        full_name: data.full_name || '',
                        cpf: data.cpf || '',
                        lot_number: data.lot_number || '',
                        birth_date: data.birth_date || ''
                    })
                }
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const formatCPF = (value: string) => {
        const numbers = value.replace(/\D/g, '')
        if (numbers.length <= 11) {
            return numbers
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        }
        return value
    }

    const handleCPFChange = (value: string) => {
        setFormData({ ...formData, cpf: formatCPF(value) })
    }

    const validateForm = () => {
        if (!formData.full_name.trim()) {
            setError('Nome completo é obrigatório')
            return false
        }

        if (formData.full_name.trim().length < 3) {
            setError('Nome deve ter pelo menos 3 caracteres')
            return false
        }

        // Validar CPF se preenchido
        if (formData.cpf && formData.cpf.replace(/\D/g, '').length !== 11) {
            setError('CPF deve ter 11 dígitos')
            return false
        }

        return true
    }

    const handleSave = async () => {
        setError('')
        setSuccess(false)

        if (!validateForm()) return

        setSaving(true)

        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error('Usuário não autenticado')

            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.full_name.trim(),
                    cpf: formData.cpf.replace(/\D/g, '') || null,
                    lot_number: formData.lot_number.trim() || null,
                    birth_date: formData.birth_date || null
                })
                .eq('id', user.id)

            if (updateError) throw updateError

            setSuccess(true)

            // Redirecionar após 1 segundo
            setTimeout(() => {
                router.push('/perfil')
            }, 1000)

        } catch (err: any) {
            setError(err.message || 'Erro ao salvar alterações')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header Fixo */}
            <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
                <div className="flex items-center justify-between px-4 h-14">
                    <div className="flex items-center gap-4">
                        <Link href="/perfil" className="text-stone-600 hover:text-stone-900 transition-colors">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-lg font-bold text-stone-900">Editar Perfil</h1>
                    </div>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            'Salvar'
                        )}
                    </Button>
                </div>
            </header>

            {/* Conteúdo Scrollável */}
            <main className="pb-28 p-4 max-w-2xl mx-auto">
                {/* Mensagens de Feedback */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-sm font-medium text-green-800">
                            ✓ Perfil atualizado com sucesso!
                        </p>
                    </div>
                )}

                {/* Formulário */}
                <div className="space-y-6">
                    {/* Nome Completo */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                            <User className="w-4 h-4" />
                            Nome Completo *
                        </label>
                        <Input
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            placeholder="Digite seu nome completo"
                            className="h-12 bg-white border-stone-300"
                            required
                        />
                        <p className="text-xs text-stone-500">Mínimo 3 caracteres</p>
                    </div>

                    {/* CPF */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                            <CreditCard className="w-4 h-4" />
                            CPF
                        </label>
                        <Input
                            value={formData.cpf}
                            onChange={(e) => handleCPFChange(e.target.value)}
                            placeholder="000.000.000-00"
                            maxLength={14}
                            className="h-12 bg-white border-stone-300"
                        />
                        <p className="text-xs text-stone-500">Opcional - Digite apenas os números</p>
                    </div>

                    {/* Unidade/Lote */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                            <MapPin className="w-4 h-4" />
                            Unidade/Lote
                        </label>
                        <Input
                            value={formData.lot_number}
                            onChange={(e) => setFormData({ ...formData, lot_number: e.target.value })}
                            placeholder="Ex: A-12"
                            maxLength={20}
                            className="h-12 bg-white border-stone-300"
                        />
                        <p className="text-xs text-stone-500">Número ou código da sua unidade</p>
                    </div>

                    {/* Data de Nascimento */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                            <Calendar className="w-4 h-4" />
                            Data de Nascimento
                        </label>
                        <Input
                            type="date"
                            value={formData.birth_date}
                            onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                            className="h-12 bg-white border-stone-300"
                        />
                        <p className="text-xs text-stone-500">Opcional</p>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold shadow-lg shadow-indigo-200"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Salvando Alterações...
                                </>
                            ) : (
                                'Salvar Alterações'
                            )}
                        </Button>

                        <Button
                            onClick={() => router.push('/perfil')}
                            variant="outline"
                            disabled={saving}
                            className="w-full h-12 bg-white border-stone-300 text-stone-700 hover:bg-stone-50"
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}
