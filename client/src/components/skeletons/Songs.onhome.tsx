import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 m-2 rounded-md">
        {Array(6).fill(0).map((_, idx) => (
          <div key={idx} className="flex items-center gap-4 group rounded-md bg-zinc-800/50 py-3 cursor-pointer relative hover:bg-zinc-600">
            <Skeleton className="h-12 w-12 rounded-md mx-2 mr-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 md:w-32 lg:w-38 mb-2" />
              <Skeleton className="h-4 w-32 md:w-40 lg:w-48" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
