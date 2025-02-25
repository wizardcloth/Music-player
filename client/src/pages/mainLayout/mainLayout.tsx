import { Outlet } from "react-router-dom"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Leftsidebar from "./components/leftsidebar";
import RightBar from "./components/rightBar";
import { useMusicStore } from "@/stores/musicStore";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import AudioPlayer from "./components/audioplayer";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function mainLayout() {
  const { checkAdmin } = useAuthStore();
  const { fetchAlbums } = useMusicStore();
  const { fetchfeaturedSongs, fetchMadeForYou, fetchTrendingSongs } = useMusicStore();
  const [user] = useAuthState(auth);


  useEffect(() => {
    async function loader() {
      if (user) { await checkAdmin(); }
      await Promise.all([
        fetchfeaturedSongs(),
        fetchMadeForYou(),
        fetchTrendingSongs(),
      ]);

      await fetchAlbums();
    }
    loader();
  }, [fetchAlbums, fetchfeaturedSongs, fetchMadeForYou, fetchTrendingSongs]);




  const ismobile = false;
  return (

    <div className="h-screen flex flex-col">
      <AudioPlayer />
      <ResizablePanelGroup direction="horizontal" className="p-0 h-full overflow-hidden">
        <ResizablePanel defaultSize={20} maxSize={30} minSize={ismobile ? 0 : 20}>
          <Leftsidebar />
        </ResizablePanel>
        <ResizableHandle className="w-1 bg-black" />
        <ResizablePanel defaultSize={ismobile ? 100 : 80}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-1 bg-black" />
        <ResizablePanel defaultSize={20} maxSize={25} minSize={0} collapsedSize={0}>
          <RightBar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default mainLayout