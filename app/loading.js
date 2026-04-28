// Next.js replaces it with actual content when ready
// No props needed — Next.js handles everything

export default function JobsLoading() {
    return (
        <div className="space-y-6">

            {/* Header skeleton */}
            <div className="space-y-2">
                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Job card skeletons */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-200 p-5 space-y-3"
                >
                    <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="flex gap-4">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    )
};