import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2",
                {
                    "border-transparent bg-[#2563eb] text-white hover:bg-[#1d4ed8]": variant === "default",
                    "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-200/80": variant === "secondary",
                    "border-transparent bg-red-500 text-white hover:bg-red-600": variant === "destructive",
                    "text-neutral-950": variant === "outline",
                    "border-transparent bg-green-100 text-green-700 hover:bg-green-200": variant === "success",
                    "border-transparent bg-amber-100 text-amber-700 hover:bg-amber-200": variant === "warning",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
