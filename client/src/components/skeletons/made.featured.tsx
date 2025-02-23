import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonSongs() {
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <Skeleton className='h-6 w-40 sm:w-48 mb-2' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-2'>
        {Array(4).fill(0).map((_, idx) => (
          <div
            key={idx}
            className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
          >
            <div className='relative mb-4'>
              <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                <Skeleton className='w-full h-full rounded-md' />
              </div>
            </div>
            <Skeleton className='h-5 w-3/4 mb-2' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    </div>
  )
}
