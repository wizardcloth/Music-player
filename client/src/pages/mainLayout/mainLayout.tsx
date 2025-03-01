import { Outlet } from "react-router-dom"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Leftsidebar from "./components/leftsidebar";
import RightBar from "./components/rightBar";
import { useMusicStore } from "@/stores/musicStore";
import AudioPlayer from "./components/audioplayer";
import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import PlayMenu from "./components/PlayingMenu";
import { usePlayerStore } from "@/stores/playerStore";
function mainLayout() {
  const { fetchAlbums } = useMusicStore();
  const { fetchfeaturedSongs, fetchMadeForYou, fetchTrendingSongs } = useMusicStore();
  const { initializeQueue } = usePlayerStore();


  // const [user] = useAuthState(auth);
  useEffect(() => {
    async function loader() {

      await Promise.all([
        fetchfeaturedSongs(),
        fetchMadeForYou(),
        fetchTrendingSongs(),
      ]);

      await fetchAlbums();
    }
    loader();
  }, [fetchAlbums, fetchfeaturedSongs, fetchMadeForYou, fetchTrendingSongs, initializeQueue]);


  const [ismobile, setismobile] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setismobile(window.innerWidth < 768);
    })
    return () => {
      window.removeEventListener("resize", () => {
        setismobile(window.innerWidth < 768);
      })
    }
  })

  return (

    <div className="h-screen flex flex-col">
      <AudioPlayer />
      <ResizablePanelGroup direction="horizontal" className="p-0 h-full overflow-hidden">
        <ResizablePanel defaultSize={20} maxSize={30} minSize={ismobile ? 0 : 16}>
          <Leftsidebar />
        </ResizablePanel>
        <ResizableHandle className="h-[calc(100vh-85px)] w-1" />
        <ResizablePanel defaultSize={ismobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        {
          !ismobile && (
            <>
              <ResizableHandle className="h-[calc(100vh-85px)] w-1" />
              <ResizablePanel defaultSize={15} maxSize={25} minSize={0} collapsedSize={0}>
                <RightBar />
              </ResizablePanel>
            </>
          )
        }
      </ResizablePanelGroup>
      <PlayMenu />
    </div>
  )
}

export default mainLayout