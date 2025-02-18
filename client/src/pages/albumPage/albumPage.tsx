import { useParams } from "react-router-dom";
import { useMusicStore } from "@/stores/musicStore";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlayIcon, ShuffleIcon, Clock } from "lucide-react";
export default function AlbumPage() {
    const { albumId } = useParams();
    const { fetchAlbumsById, currentAlbum } = useMusicStore();
    // console.log(albumId);
    // console.log({ currentAlbum });
    useEffect(() => {
        if (albumId) fetchAlbumsById(albumId);
    }, [fetchAlbumsById, albumId])


    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };
    return (
        <>
            <div className="h-full">
                <ScrollArea className="h-full">
                    <div className="relative min-h-full">
                        {/*//&  gradient */}
                        <div
                            className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none'
                            aria-hidden='true'
                        />
                        {/*//&  main-content */}
                        <div className='relative z-10'>
                            <div className='flex p-6 gap-6 pb-8'>
                                <img
                                    src={currentAlbum?.imageUrl}
                                    alt={currentAlbum?.title}
                                    className='w-[240px] h-[240px] shadow-xl rounded'
                                />
                                <div className='flex flex-col justify-end'>
                                    <p className='text-sm font-medium'>Album</p>
                                    <h1 className='text-7xl font-bold my-4'>{currentAlbum?.title}</h1>
                                    <div className='flex items-center gap-2 text-sm text-zinc-100'>
                                        <span className='font-medium text-white'>{currentAlbum?.artist}</span>
                                        <span>• {currentAlbum?.songs.length} songs</span>
                                        <span>• {currentAlbum?.releaseYear}</span>
                                    </div>
                                </div>
                            </div>

                            {/*//&play-button */}
                            <div className='flex items-center gap-4'>
                                <button className='flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 hover:text-emerald-500' >
                                    <PlayIcon className='w-6 h-6' />
                                    <span>Play</span>
                                </button>
                                <button className='flex items-center gap-2 px-2 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 hover:text-emerald-500' >
                                    <ShuffleIcon className='w-6 h-6' />
                                    <span>Shuffle</span>
                                </button>
                            </div>

                            {/* //&table */}
                            <div className='bg-black/20 backdrop-blur-sm'>

                                <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-5 py-2 text-sm 
            text-zinc-400 border-b border-white/5'>
                                    <div>#</div>
                                    <div>Title</div>
                                    <div>Released Date</div>
                                    <div>
                                        <Clock className='h-4 w-4' />
                                    </div>
                                </div>


                                {currentAlbum?.songs.map((song, index) => (
                                    <div key={song._id} className='text-zinc-100 hover:bg-zinc-800 grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm hover:bg-white/5 rounded-md group cursor-pointer'>
                                        <span className="flex items-center justify-center group-hover:hidden">{index + 1}</span>
                                        <PlayIcon className="hidden group-hover:flex items-center my-3 text-emerald-500 font-medium h-5 w-5" />
                                        <div className='flex items-center gap-3'>
                                            <img src={song.imageUrl} alt={song.title} className='size-10 rounded-sm' />

                                            <div>
                                                <div className={`font-medium text-white`}>{song.title}</div>
                                                <div>{song.artist}</div>
                                            </div>
                                        </div>
                                        <div className='flex items-center'>{song.createdAt.split("T")[0]}</div>
                                        <div className='flex items-center'>{formatDuration(song.duration)}</div>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>
                </ScrollArea >
            </div >

        </>
    )
}
