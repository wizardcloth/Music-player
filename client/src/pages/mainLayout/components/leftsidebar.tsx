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
            <div className="h-full flex flex-col gap-0">
                <div className="bg-zinc-900 p-4 rounded m-2">
                    <div className="space-y-2">
                        <Link to={"/"}>
                            <div className="flex items-center hover:bg-zinc-700 p-2">
                                <HomeIcon className=" md:size-5 mr-2 " />
                                <span className="hidden md:block">Home</span>
                            </div>
                        </Link>

                        <div>
                            <Link to={"/chat"} >
                                {
                                    user && (
                                        <div className="flex items-center  hover:bg-zinc-700   p-2">
                                            <MessageCircle className="md:size-5 mr-2 " />
                                            <span className="hidden md:block " >Message</span>
                                        </div>
                                    )
                                }
                            </Link>
                        </div>
                    </div>
                </div>
                {/* library */}
                <div className="h-[calc(100vh-185px)]">
                    <div className="flex-1 bg-zinc-900  rounded m-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-white">
                                <Library className="hidden md:block size-5 m-2" />
                                <span   className="text-sm md:text-base">Playlists</span>
                            </div>
                        </div>

                        {
                            (!user) ? ("please login") : (
                                <ScrollArea className="h-[calc(100vh-300px)]">
                                    <div className="space-y-2">
                                        {
                                            isloading ? (<PlaylistSkeleton />) : (
                                                albums.map((album) => (

                                                    <Link to={`/albums/${album._id}`} key={album._id} className="flex items-center hover:bg-zinc-700 p-2 rounded-md gap-3 cursor-pointer">
                                                        <img src={album.imageUrl} alt={"img"} className="size-12 rounded-md object-cover flex-shrink-0 border border-zinc-200" />
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
            </div>
        </>
    )
}

export default leftsidebar