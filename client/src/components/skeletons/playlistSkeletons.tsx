import { Skeleton } from "@/components/ui/skeleton"

export default function playlistSkeleton() {
    return (
        Array(8).fill(0).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 rounded-md gap-3 p-2">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2 ">
                    <Skeleton className="h-4 w-[110px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        ))
    )
}
