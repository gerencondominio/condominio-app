'use client'

import React, { useState, useMemo } from 'react'
import { Search, X, MapPin, User, Maximize2, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

// Dados dos lotes
const MOCK_LOTS = [
    // Quadra 1 - Lado Esquerdo
    { quadra: 1, lote: 1, area: 356.97, owner: 'Danilo Alves Barbosa de Andrade', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 2, area: 362.53, owner: 'Danilo Alves Barbosa de Andrade', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 3, area: 366.20, owner: 'Danilo Alves Barbosa de Andrade', status: 'occupied', paymentStatus: 'pending', side: 'left' },
    { quadra: 1, lote: 4, area: 368.53, owner: 'Danilo Alves Barbosa de Andrade', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 5, area: 369.65, owner: 'Danilo Alves Barbosa de Andrade', status: 'occupied', paymentStatus: 'pending', side: 'left' },
    { quadra: 1, lote: 6, area: 363.91, owner: 'Danilo Alves Barbosa de Andrade', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 7, area: 358.42, owner: 'Danilo Alves Barbosa de Andrade', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 8, area: 352.73, owner: 'Danilo Alves Barbosa de Andrade', status: 'occupied', paymentStatus: 'pending', side: 'left' },
    { quadra: 1, lote: 9, area: 347.31, owner: 'Gisele Pereira Nunes', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 10, area: 327.00, owner: 'Jessica Alves Dos Santos', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 12, area: 329.90, owner: 'Douglas Andrade Dias Da Silva', status: 'occupied', paymentStatus: 'pending', side: 'left' },
    { quadra: 1, lote: 13, area: 341.20, owner: 'Willian José De Araújo Lameu', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 14, area: 341.94, owner: 'Iranildo Barros Alves', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 15, area: 335.56, owner: 'Bianca Deodato De Souza', status: 'occupied', paymentStatus: 'pending', side: 'left' },
    { quadra: 1, lote: 16, area: 330.70, owner: 'Josenildo Miliano Da Silva', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 17, area: 336.76, owner: 'Suevavanio Barbosa De Lima', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 18, area: 299.99, owner: 'Gertone Evangelista Rocha', status: 'occupied', paymentStatus: 'pending', side: 'left' },
    { quadra: 1, lote: 19, area: 231.65, owner: 'Wagner Rodrigues Pequeno', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 20, area: 228.85, owner: 'Diego Roberto Santos Ferreira', status: 'occupied', paymentStatus: 'regular', side: 'left' },
    { quadra: 1, lote: 44, area: 299.66, owner: 'Lucas Deodato Cerqueira', status: 'occupied', paymentStatus: 'pending', side: 'left' },
    { quadra: 1, lote: 45, area: 368.94, owner: 'Danilo Alves Barbosa de Andrade', status: 'empty', paymentStatus: 'regular', side: 'left' },

    // Quadra 2 - Lado Direito
    { quadra: 2, lote: 21, area: 360.99, owner: 'Ana Carolina De Souza Pires', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 22, area: 381.63, owner: 'Marcos Vinicius Do Carmo', status: 'occupied', paymentStatus: 'pending', side: 'right' },
    { quadra: 2, lote: 24, area: 376.16, owner: 'Luciana Paulino Alves', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 25, area: 372.56, owner: 'Jair Vicente De Souza', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 26, area: 362.61, owner: 'André De Paula Mariano', status: 'occupied', paymentStatus: 'pending', side: 'right' },
    { quadra: 2, lote: 27, area: 360.38, owner: 'Danilo/Marcelo', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 28, area: 354.82, owner: 'José Gildo De Santana', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 29, area: 349.57, owner: 'Renan Will Alves Keller', status: 'occupied', paymentStatus: 'pending', side: 'right' },
    { quadra: 2, lote: 30, area: 344.39, owner: 'Elenelda Santos Negrão', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 31, area: 339.19, owner: 'Marcia Batista De Souza', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 32, area: 330.82, owner: 'Edvaldo Rodrigues De Souza', status: 'occupied', paymentStatus: 'pending', side: 'right' },
    { quadra: 2, lote: 33, area: 310.15, owner: 'Edineide Da Conceição', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 34, area: 327.63, owner: 'Jonas Carvalho Da Silva', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 35, area: 323.96, owner: 'Jalécia Batista Da Silva', status: 'occupied', paymentStatus: 'pending', side: 'right' },
    { quadra: 2, lote: 36, area: 320.10, owner: 'Domingos Paulo Barbosa', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 37, area: 316.31, owner: 'Breno Carlos Dos Santos', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 38, area: 312.67, owner: 'Marcos Vinicius Do Carmo', status: 'occupied', paymentStatus: 'pending', side: 'right' },
    { quadra: 2, lote: 39, area: 309.18, owner: 'Victor Benedito Da Silva', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 40, area: 305.59, owner: 'Leilson Ivan Pereira Nunes', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 41, area: 302.17, owner: 'Daiana Santos David', status: 'occupied', paymentStatus: 'pending', side: 'right' },
    { quadra: 2, lote: 42, area: 293.76, owner: 'Danilo Alves Barbosa', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 43, area: 433.78, owner: 'Cicero Régis Da Cruz', status: 'occupied', paymentStatus: 'regular', side: 'right' },
    { quadra: 2, lote: 46, area: 370.86, owner: 'Danilo Alves Barbosa', status: 'empty', paymentStatus: 'regular', side: 'right' },
]

interface LotCardProps {
    lot: typeof MOCK_LOTS[0]
    isSelected: boolean
    isFiltered: boolean
    onClick: () => void
}

function LotCard({ lot, isSelected, isFiltered, onClick }: LotCardProps) {
    // Truncar nome para mostrar apenas primeiros 2 nomes
    const shortName = lot.owner.split(' ').slice(0, 2).join(' ')

    return (
        <button
            onClick={onClick}
            disabled={isFiltered}
            className={cn(
                "relative w-full min-h-[100px] rounded-2xl border-3 transition-all duration-300 active:scale-95",
                "flex flex-col items-center justify-center gap-2 p-4 touch-manipulation",
                isSelected
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 border-indigo-800 shadow-xl shadow-indigo-500/50 scale-105 z-10"
                    : isFiltered
                        ? "bg-gray-100 border-gray-200 opacity-30"
                        : "bg-gradient-to-br from-stone-50 to-stone-100 border-stone-300 shadow-md hover:shadow-lg active:shadow-xl"
            )}
        >
            {/* Número do Lote */}
            <div className={cn(
                "text-3xl font-black tracking-tight",
                isSelected ? "text-white" : "text-stone-800"
            )}>
                {lot.lote}
            </div>

            {/* Nome do Proprietário */}
            <div className={cn(
                "text-sm font-semibold text-center leading-tight line-clamp-2",
                isSelected ? "text-white" : "text-stone-700"
            )}>
                {shortName}
            </div>

            {/* Indicador de Status de Pagamento */}
            {!isFiltered && (
                <div className={cn(
                    "absolute top-2 right-2 w-3 h-3 rounded-full",
                    lot.paymentStatus === 'regular' ? 'bg-green-500' : 'bg-orange-500',
                    isSelected && 'ring-2 ring-white'
                )}>
                </div>
            )}

            {/* Badge de Vago */}
            {lot.status === 'empty' && !isFiltered && (
                <div className={cn(
                    "absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full",
                    isSelected ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600"
                )}>
                    VAGO
                </div>
            )}
        </button>
    )
}

export default function MapPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedLot, setSelectedLot] = useState<typeof MOCK_LOTS[0] | null>(null)

    // Filtrar lotes pela busca
    const filteredLots = useMemo(() => {
        if (!searchTerm) return MOCK_LOTS
        const term = searchTerm.toLowerCase()
        return MOCK_LOTS.filter(l =>
            l.owner.toLowerCase().includes(term) ||
            l.lote.toString().includes(term)
        )
    }, [searchTerm])

    // Organizar lotes por pares (esquerda/direita) para layout lado a lado
    const maxRows = Math.max(
        MOCK_LOTS.filter(l => l.side === 'left').length,
        MOCK_LOTS.filter(l => l.side === 'right').length
    )

    const leftLots = MOCK_LOTS.filter(l => l.side === 'left')
    const rightLots = MOCK_LOTS.filter(l => l.side === 'right')

    const isLotFiltered = (lot: typeof MOCK_LOTS[0]) => {
        return !!searchTerm && !filteredLots.some(fl => fl.lote === lot.lote)
    }

    const handleClearSearch = () => {
        setSearchTerm('')
        setSelectedLot(null)
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header Fixo */}
            <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
                <div className="p-4 space-y-3">
                    {/* Título */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-stone-900">Mapa do Condomínio</h1>
                                <p className="text-xs text-stone-500">
                                    {searchTerm ? `${filteredLots.length} resultado${filteredLots.length !== 1 ? 's' : ''}` : `${MOCK_LOTS.length} lotes`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Busca */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                        <Input
                            placeholder="Buscar por lote ou proprietário..."
                            className="pl-10 pr-10 h-12 text-base bg-stone-50 border-stone-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Legenda */}
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            <span className="text-stone-600">Em dia</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                            <span className="text-stone-600">Pendente</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                            <span className="text-stone-600">Selecionado</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mapa com Scroll */}
            <main className="flex-1 overflow-y-auto bg-stone-50">
                <div className="relative mx-auto max-w-2xl px-4 py-6">
                    {/* Container do Mapa */}
                    <div className="relative">
                        {/* Rua Vertical Central */}
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-20 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300">
                            {/* Linha central da rua */}
                            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-yellow-400 opacity-50"></div>

                            {/* Marcação de rua a cada 150px */}
                            <div className="absolute inset-0 flex flex-col">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-1 bg-yellow-400 opacity-30 mx-auto my-4"
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Grid de Lotes - Lado a Lado */}
                        <div className="relative space-y-5">
                            {Array.from({ length: maxRows }).map((_, rowIndex) => {
                                const leftLot = leftLots[rowIndex]
                                const rightLot = rightLots[rowIndex]

                                return (
                                    <div key={rowIndex} className="grid grid-cols-2 gap-24 items-center">
                                        {/* Lote Esquerdo */}
                                        <div className="flex justify-end">
                                            {leftLot ? (
                                                <div className="w-full max-w-[160px]">
                                                    <LotCard
                                                        lot={leftLot}
                                                        isSelected={selectedLot?.lote === leftLot.lote}
                                                        isFiltered={isLotFiltered(leftLot)}
                                                        onClick={() => setSelectedLot(leftLot)}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full max-w-[160px]"></div>
                                            )}
                                        </div>

                                        {/* Lote Direito */}
                                        <div className="flex justify-start">
                                            {rightLot ? (
                                                <div className="w-full max-w-[160px]">
                                                    <LotCard
                                                        lot={rightLot}
                                                        isSelected={selectedLot?.lote === rightLot.lote}
                                                        isFiltered={isLotFiltered(rightLot)}
                                                        onClick={() => setSelectedLot(rightLot)}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full max-w-[160px]"></div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Espaçamento no final */}
                    <div className="h-20"></div>
                </div>
            </main>

            {/* Bottom Sheet - Detalhes do Lote Selecionado */}
            {selectedLot && (
                <div className="fixed bottom-0 inset-x-0 bg-white border-t-4 border-indigo-600 rounded-t-3xl shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
                    <div className="p-6 space-y-4">
                        {/* Header do Sheet */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                                    {selectedLot.lote}
                                </div>
                                <div>
                                    <div className="text-xs text-stone-500 font-semibold uppercase tracking-wide">Lote Selecionado</div>
                                    <h2 className="text-2xl font-bold text-stone-900 mt-1">Lote {selectedLot.lote}</h2>
                                    <div className="text-sm text-indigo-600 font-semibold">Quadra {selectedLot.quadra}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedLot(null)}
                                className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5 text-stone-600" />
                            </button>
                        </div>

                        {/* Informações */}
                        <div className="space-y-3">
                            {/* Proprietário */}
                            <div className="bg-stone-50 rounded-xl p-4">
                                <div className="text-xs text-stone-500 font-bold uppercase tracking-wide mb-2 flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" />
                                    Proprietário
                                </div>
                                <div className="text-base font-semibold text-stone-900">{selectedLot.owner}</div>
                            </div>

                            {/* Grid de Info */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Área */}
                                <div className="bg-indigo-50 rounded-xl p-4">
                                    <div className="text-xs text-indigo-700 font-bold uppercase tracking-wide mb-2 flex items-center gap-2">
                                        <Maximize2 className="w-3.5 h-3.5" />
                                        Área
                                    </div>
                                    <div className="text-lg font-bold text-stone-900">
                                        {selectedLot.area.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²
                                    </div>
                                </div>

                                {/* Status de Pagamento */}
                                <div className={cn(
                                    "rounded-xl p-4",
                                    selectedLot.paymentStatus === 'regular' ? 'bg-green-50' : 'bg-orange-50'
                                )}>
                                    <div className={cn(
                                        "text-xs font-bold uppercase tracking-wide mb-2",
                                        selectedLot.paymentStatus === 'regular' ? 'text-green-700' : 'text-orange-700'
                                    )}>
                                        Pagamento
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-2.5 h-2.5 rounded-full",
                                            selectedLot.paymentStatus === 'regular' ? 'bg-green-500' : 'bg-orange-500'
                                        )}></div>
                                        <span className={cn(
                                            "text-sm font-bold",
                                            selectedLot.paymentStatus === 'regular' ? 'text-green-700' : 'text-orange-700'
                                        )}>
                                            {selectedLot.paymentStatus === 'regular' ? 'Em Dia' : 'Pendente'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Botão de Ação */}
                            <button className="w-full h-14 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 active:scale-98 transition-all flex items-center justify-center gap-2">
                                Ver Detalhes Completos
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Estado Vazio - Nenhum Resultado */}
            {searchTerm && filteredLots.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-40">
                    <div className="text-center px-6">
                        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-stone-300" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">Nenhum lote encontrado</h3>
                        <p className="text-sm text-stone-500 mb-6">
                            Não encontramos resultados para "{searchTerm}"
                        </p>
                        <button
                            onClick={handleClearSearch}
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Limpar Busca
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
