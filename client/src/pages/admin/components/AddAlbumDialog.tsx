import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";

function AddAlbumDialog() {
  const [albumDialogOpen, setalbumDialogOpen] = useState(false);
  const [isloading, setisloading] = useState(false);
  const fileInputref = useRef<HTMLInputElement>(null);

  const [imagefile, setimagefile] = useState<File | null>(null);

  const [newAlbum, setNewAlbum] = useState({
    title: '',
    artist: '',
    releaseYear: new Date().getFullYear(),
  })

  const handleSubmit = async () => {

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
                setimagefile(e.target.files![0]);
              }}
            />


            <div className="flex items-center gap-2 justify-center border-2 border-dotted border-zinc-600 rounded-md p-6"
              onClick={() => fileInputref.current?.click()}
            >
              <div className="text-center">
                {
                  imagefile ? (
                    <div className="space-y-4">
                      <div className='text-sm text-emerald-500'>Image selected:</div>
                      <div className='text-xs text-zinc-400'>{imagefile.name.slice(0, 20)}</div>
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