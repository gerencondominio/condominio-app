import { Card } from '@/components/ui/Card'

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between p-6 bg-white sticky top-0 z-10">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            <div className="p-6 space-y-6 max-w-md lg:max-w-6xl mx-auto">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
                    {/* Left Column: Finances Skeleton */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Balance Card Skeleton */}
                        <Card className="bg-white border-none p-6 md:p-8 shadow-sm h-48 animate-pulse">
                            <div className="space-y-4">
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                <div className="h-12 w-3/4 bg-gray-200 rounded"></div>
                                <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
                            </div>
                        </Card>

                        {/* Stats Grid Skeleton */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className={`p-4 h-24 animate-pulse ${i === 3 ? 'lg:col-span-1 col-span-2' : ''}`}>
                                    <div className="h-8 w-8 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-3 w-24 bg-gray-200 rounded mb-1"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Improvements Skeleton */}
                    <div className="lg:col-span-5 space-y-4 mt-8 lg:mt-0">
                        <div className="flex justify-between items-center">
                            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <Card key={i} className="p-4 h-32 animate-pulse">
                                    <div className="flex gap-3 mb-4">
                                        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                            <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
