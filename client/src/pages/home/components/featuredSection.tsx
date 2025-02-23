import { useMusicStore } from "@/stores/musicStore"
import { SkeletonCard } from "@/components/skeletons/Songs.onhome";
function featuredSection() {
  const { featuredSongs,isloading } = useMusicStore();
  // console.log(featuredSongs);
  return (
    (isloading)?(<SkeletonCard/>):(

      <div className="h-full">
      <div className="text-3xl font-bold m-4">
          <h1>Good afternoon</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 m-2 rounded-md">
          {
            featuredSongs.map((song) => {
              return (
                <div key={song._id} className="flex items-center gap-4 group rounded-md bg-zinc-800/50 py-3  cursor-pointer relative hover:bg-zinc-600">
                  <img src={song.imageUrl} alt={song.title} className="w-16 rounded-md ml-2 sm:w-20 h-16 object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <span className={"text-xl font-medium"}>{song.title}</span>
                    <p className="text-sm">{song.artist}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
        </div >
      )
  )
}

export default featuredSection