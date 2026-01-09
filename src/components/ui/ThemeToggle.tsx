'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-14 h-8 rounded-full bg-stone-200 dark:bg-stone-700"></div>
        )
    }

    const isDark = theme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative w-14 h-8 rounded-full bg-stone-200 dark:bg-stone-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={`Mudar para modo ${isDark ? 'claro' : 'escuro'}`}
        >
            <div
                className={`absolute top-1 ${isDark ? 'right-1' : 'left-1'
                    } w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center`}
            >
                {isDark ? (
                    <Moon className="w-4 h-4 text-indigo-600" />
                ) : (
                    <Sun className="w-4 h-4 text-yellow-500" />
                )}
            </div>
        </button>
    )
}
