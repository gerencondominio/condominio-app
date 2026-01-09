import { Skeleton } from "@/components/ui/Skeleton"
import { Card } from "@/components/ui/Card"
import { AnimatedList, AnimatedItem } from "@/components/ui/AnimatedList"

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header Skeleton */}
            <div className="lg:hidden p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 transition-all duration-200 shadow-sm">
                <div className="flex items-center gap-4 w-full">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-10 w-10 rounded-full ml-auto" />
                </div>
            </div>

            <div className="p-4 lg:p-8 space-y-6 max-w-md lg:max-w-6xl mx-auto">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    {/* Desktop Sidebar Skeleton */}
                    <div className="hidden lg:block lg:col-span-4 space-y-6">
                        <div>
                            <Skeleton className="h-8 w-48 mb-2" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                        <Card className="p-4 space-y-2">
                            <Skeleton className="h-6 w-24 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </Card>
                    </div>

                    {/* Main Feed Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Create Post Form */}
                        <div className="bg-white p-1 rounded-2xl shadow-sm">
                            <Skeleton className="h-32 w-full rounded-xl" />
                        </div>

                        {/* Mobile Tabs */}
                        <div className="lg:hidden flex gap-2 overflow-hidden pb-2">
                            <Skeleton className="h-8 w-20 rounded-full" />
                            <Skeleton className="h-8 w-24 rounded-full" />
                            <Skeleton className="h-8 w-24 rounded-full" />
                        </div>

                        {/* Feed */}
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <AnimatedItem key={i} index={i - 1}>
                                    <Card className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-3">
                                                <Skeleton className="h-10 w-10 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-32" />
                                                    <Skeleton className="h-3 w-24" />
                                                </div>
                                            </div>
                                            <Skeleton className="h-6 w-16 rounded-full" />
                                        </div>
                                        <div className="space-y-2 mb-6">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-3/4" />
                                        </div>
                                        <div className="flex justify-between">
                                            <Skeleton className="h-8 w-16" />
                                            <Skeleton className="h-8 w-16" />
                                        </div>
                                    </Card>
                                </AnimatedItem>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
