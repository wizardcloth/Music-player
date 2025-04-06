import { HomeIcon, MessageCircle, Library } from "lucide-react"
import { Link } from "react-router-dom"
import { auth } from "../../../lib/firebase"; // Import Firebase auth instance
import { useAuthState } from "react-firebase-hooks/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/playlistSkeletons";
import { useMusicStore } from "@/stores/musicStore"

function leftsidebar() {
    const [user] = useAuthState(auth);
    const { albums, isloading } = useMusicStore();

    return (

        <>
            {/* navigation */}
            <div className="h-[calc(100vh-75px)] flex flex-col gap-2">
                <div className="bg-zinc-900 rounded ">
                    <div className="space-y-2">
                        <Link to={"/"}>
                            <div className="flex items-center hover:bg-zinc-700 p-2">
                                <HomeIcon className="size-8 sm:size-6 mr-2" />
                                <span className="hidden sm:inline">Home</span>
                            </div>
                        </Link>

                        <div>
                            <Link to={"/chat"}>
                                {user && (
                                    <div className="flex items-center hover:bg-zinc-700 p-2">
                                        <MessageCircle className="size-8 sm:size-6 mr-2" />
                                        <span className="hidden sm:inline">Message</span>
                                    </div>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
                {/* playlist */}
                <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
                    <div className='flex items-center justify-between mb-4'>
                        <div className='flex items-center text-white'>
                            <Library className='hidden sm:inline' />
                            <span className='size-8 sm:size-6 mr-2 font-medium'>Playlists</span>
                        </div>
                    </div>

                    {
                        (!user) ? ("please login") : (
                            <ScrollArea className="h-[calc(100vh-300px)]">
                                <div className="space-y-4">
                                    {
                                        isloading ? (<PlaylistSkeleton />) : (
                                            albums.map((album) => (

                                                <Link to={`/albums/${album._id}`} key={album._id} className="flex items-center hover:bg-zinc-700 rounded-md  cursor-pointer">
                                                    <img src={album.imageUrl} alt={"img"} className="size-12 rounded-md object-cover border border-zinc-200" />
                                                    <div className="flex-1 min-w-0 hidden md:block">
                                                        <span className="ml-2 font-medium truncate">{album.title}</span>
                                                        <p className="ml-2 text-sm truncate">Album &#x2022; {album.releaseYear}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        )
                                    }
                                </div>
                            </ScrollArea>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default leftsidebar