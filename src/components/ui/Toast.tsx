'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
    id: string
    title: string
    description?: string
    type: ToastType
    duration?: number
}

interface ToastContextData {
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used within a ToastProvider')
    return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const removeToast = useCallback((id: string) => {
        setToasts((state) => state.filter((toast) => toast.id !== id))
    }, [])

    const addToast = useCallback(({ title, description, type, duration = 4000 }: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast = { id, title, description, type, duration }

        setToasts((state) => [...state, newToast])

        setTimeout(() => removeToast(id), duration)
    }, [removeToast])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        pointer-events-auto
                        flex items-start gap-3 p-4 rounded-xl shadow-lg border border-opacity-10
                        transform transition-all duration-300 animate-in slide-in-from-right-full fade-in
                        ${toast.type === 'success' ? 'bg-white border-green-200 text-gray-800' : ''}
                        ${toast.type === 'error' ? 'bg-white border-red-200 text-gray-800' : ''}
                        ${toast.type === 'info' ? 'bg-white border-blue-200 text-gray-800' : ''}
                        ${toast.type === 'warning' ? 'bg-white border-orange-200 text-gray-800' : ''}
                    `}
                >
                    <div className="flex-shrink-0 mt-0.5">
                        {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                        {toast.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                        {toast.type === 'warning' && <AlertCircle className="h-5 w-5 text-orange-500" />}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-sm">{toast.title}</h3>
                        {toast.description && <p className="text-xs text-gray-500 mt-1">{toast.description}</p>}
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    {/* Progress Bar (Visual flair) */}
                    <div className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${toast.type === 'success' ? 'bg-green-500' :
                            toast.type === 'error' ? 'bg-red-500' :
                                'bg-blue-500'
                        }`} style={{ width: '100%', opacity: 0.1 }} />
                </div>
            ))}
        </div>
    )
}
