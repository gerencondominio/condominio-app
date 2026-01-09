'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ChevronRight, FileText } from 'lucide-react'
import Link from 'next/link'
import { EmptyState } from './EmptyState'
import { LucideIcon } from 'lucide-react'

// Reusable animated list wrapper
export function AnimatedList({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

// Reusable animated item
export function AnimatedItem({ children, index = 0, className = '' }: { children: React.ReactNode, index?: number, className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.05, // Stagger effect
                ease: 'easeOut'
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
