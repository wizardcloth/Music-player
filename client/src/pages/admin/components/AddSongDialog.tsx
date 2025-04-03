import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/musicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { createHeader } from "@/AuthProvider/authProvider";

function AddSongDialog() {
    const { albums } = useMusicStore();
    const [songsDialogOpen, setSongsDialogOpen] = useState(false);
    const [isloading, setisloading] = useState(false);

    const [newSong, setNewSong] = useState({
        title: "",
        artist: "",
        album: "",
        duration: ""
    });
    type filetype = {
        audio: File | null,
        image: File | null
    }


    const [files, setFiles] = useState<filetype>({
        audio: null,
        image: null,
    });

    const audioInputref = useRef<HTMLInputElement>(null);
    const imageInputref = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        try {
            setisloading(true);
            if (!files.audio || !files.image) return toast.error("Please select an audio and image file");
            if (!newSong.title || !newSong.artist || !newSong.duration) return toast.error("Please fill all the fields");

            const formData = new FormData();

            formData.append("title", newSong.title);
            formData.append("artist", newSong.artist);
            formData.append("duration", newSong.duration);
            if (newSong.album && newSong.album !== "none") {
                formData.append("albumId", newSong.album);
            }

            formData.append("audioFile", files.audio);
            formData.append("imageFile", files.image);
            const header = await createHeader();
            await axiosInstance.post("/admin/songs", formData, header);

            setNewSong({
                title: "",
                artist: "",
                album: "",
                duration: "",
            });

            setFiles({
                audio: null,
                image: null,
            });
            toast.success("Song added successfully");

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setisloading(false);
        }

    };

    return (
        <Dialog open={songsDialogOpen} onOpenChange={setSongsDialogOpen}>
            <DialogTrigger asChild>
                <Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
                    <Plus className='h-4 w-4' />
                    Add Song
                </Button>
            </DialogTrigger>
            <DialogContent>
                <ScrollArea className="h-[80vh] p-4">
                    <DialogHeader>
                        <DialogTitle>Add New Song</DialogTitle>
                        <DialogDescription>Add a new song to your music library</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <input
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            ref={audioInputref}
                            onChange={(e) => {
                                setFiles((prev) => ({
                                    ...prev,
                                    audio: e.target.files?.[0] || null,
                                }));
                            }}
                        />

                        <input
                            type='file'
                            ref={imageInputref}
                            className='hidden'
                            accept='image/*'
                            onChange={(e) => {
                                setFiles((prev) => ({
                                    ...prev,
                                    image: e.target.files![0]
                                }))
                            }}
                        />

                        {/* image uplaod area */}

                        <div className="flex items-center gap-2 justify-center border-2 border-dotted border-zinc-600 rounded-md p-6"
                            onClick={() => imageInputref.current?.click()}
                        >
                            <div className="text-center">
                                {
                                    files.image ? (
                                        <div className="space-y-2">
                                            <div className='text-sm text-emerald-500'>Image selected:</div>
                                            <div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                                                <Upload className="h-6 w-6 text-zinc-400" />
                                            </div>
                                            <div className='text-sm text-zinc-400 mb-2'>Upload artwork</div>
                                            <Button variant='outline' size='sm' className='text-xs'>
                                                Choose File
                                            </Button>
                                        </>
                                    )
                                }
                            </div>
                        </div>


                        {/* Audio upload */}
                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Audio File</label>
                            <div className='flex items-center gap-2'>
                                <Button variant='outline' onClick={() => audioInputref.current?.click()} className='w-full'>
                                    {files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
                                </Button>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Title</label>
                            <input
                                type="text"
                                className='w-full p-2 bg-zinc-800 rounded-md'
                                value={newSong.title}
                                onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Artist</label>
                            <input
                                type="text"
                                className='w-full p-2 bg-zinc-800 rounded-md'
                                value={newSong.artist}
                                onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Duration(seconds)</label>
                            <input
                                type="number"
                                min={0}
                                className='w-full p-2 bg-zinc-800 rounded-md'
                                value={newSong.duration}
                                onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
                            />
                        </div>

                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Album (Optional)</label>
                            <Select
                                value={newSong.album}
                                onValueChange={(value) => setNewSong({ ...newSong, album: value })}
                            >
                                <SelectTrigger className='bg-zinc-800 border-zinc-700'>
                                    <SelectValue placeholder='Select album' />
                                </SelectTrigger>
                                <SelectContent className='bg-zinc-800 border-zinc-700'>
                                    <SelectItem value='none'>No Album (Single)</SelectItem>
                                    {albums.map((album) => (
                                        <SelectItem key={album._id} value={album._id}>
                                            {album.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant='outline' onClick={() => setSongsDialogOpen(false)} disabled={isloading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isloading}>
                            {isloading ? "Uploading..." : "Add Song"}
                        </Button>
                    </DialogFooter>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default AddSongDialog