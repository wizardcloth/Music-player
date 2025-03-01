import { usePlayerStore } from "@/stores/playerStore";
import { Song } from "@/types";
import { Play, Pause } from "lucide-react"; // Import Play and Pause icons from lucide-react

function PlayButton({ song }: { song: Song }) {
    const { currentSong, togglePlay, isPlaying, setCurrentSong } = usePlayerStore();
    const isCurrentSong = song?._id === currentSong?._id;

    const handlePlay = () => {
        if (isCurrentSong) {
            togglePlay();
        } else {
            setCurrentSong(song);
        }
    };

    return (
        <div
            className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300"
            onClick={handlePlay}
        >
            <div className="absolute bottom-2 right-2">
                {isPlaying && isCurrentSong ? (
                    <div className="opacity-100">
                        <Pause className="size-8 p-2 font-medium text-black bg-teal-300 rounded-full" />
                    </div>
                ) : (
                    <div className="opacity-100">
                        <Play className="size-8 p-2 font-bold text-black bg-teal-300 rounded-full" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayButton;
