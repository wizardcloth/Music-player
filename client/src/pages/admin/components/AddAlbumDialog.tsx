import { createHeader } from "@/AuthProvider/authProvider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import axiosInstance from "@/lib/axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function AddAlbumDialog() {
  const [albumDialogOpen, setalbumDialogOpen] = useState(false);
  const [isloading, setisloading] = useState(false);
  const fileInputref = useRef<HTMLInputElement>(null);

  const [imageFile, setimageFile] = useState<File | null>(null);

  const [newAlbum, setNewAlbum] = useState({
    title: '',
    artist: '',
    releaseYear: new Date().getFullYear(),
  })

  const handleSubmit = async () => {
    try {
      setisloading(true);
      if (!imageFile) return toast.error("Please select an image file");
      if (!newAlbum.title || !newAlbum.artist || !newAlbum.releaseYear) return toast.error("Please fill all the fields");

      const formData = new FormData();

      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear.toString());
      formData.append("imageFile", imageFile);
      const header = await createHeader();

      await axiosInstance.post("/admin/albums", formData, header);

      setNewAlbum({
        title: '',
        artist: '',
        releaseYear: new Date().getFullYear(),
      })

      setimageFile(null);
      setalbumDialogOpen(false);
      toast.success("Song added successfully");

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setisloading(false);
    }
  }

  return (
    <Dialog open={albumDialogOpen} onOpenChange={setalbumDialogOpen}>
      <DialogTrigger asChild>
        <Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
          <Plus className="h-4 w-4" />
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="h-[80vh] p-4">
          <DialogHeader>
            <DialogTitle>Add New Album</DialogTitle>
            <DialogDescription>Add a new Album to your music library</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputref}
              onChange={(e) => {
                setimageFile(e.target.files![0]);
              }}
            />


            <div className="flex items-center gap-2 justify-center border-2 border-dotted border-zinc-600 rounded-md p-6"
              onClick={() => fileInputref.current?.click()}
            >
              <div className="text-center">
                {
                  imageFile ? (
                    <div className="space-y-4">
                      <div className='text-sm text-emerald-500'>Image selected:</div>
                      <div className='text-xs text-zinc-400'>{imageFile.name.slice(0, 20)}</div>
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

          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium">Album Title</label>
            <input
              type="text"
              value={newAlbum.title}
              onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
              className='w-full p-2 bg-zinc-800 rounded-md'
            />
          </div>
          <div className="space-y-2 mt-2">
            <label className="text-sm font-medium">Artist</label>
            <input
              type="text"
              value={newAlbum.artist}
              onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
              className='w-full p-2 bg-zinc-800 rounded-md'
            />
          </div>
          <div className="space-y-2 mt-2">
            <label className="text-sm font-medium">Release Year</label>
            <input
              type="text"
              value={newAlbum.releaseYear}
              min={1900}
              max={new Date().getFullYear()}
              onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: new Date(e.target.value).getFullYear() })}
              className='w-full p-2 bg-zinc-800 rounded-md'
            />
          </div>
          <DialogFooter>
            <div className="space-y-2 p-4">
              <Button className="m-2" variant='outline' onClick={() => setalbumDialogOpen(false)} disabled={isloading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isloading}>
                {isloading ? "Uploading..." : "Add Albums"}
              </Button>
            </div>
          </DialogFooter>


        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
export default AddAlbumDialog