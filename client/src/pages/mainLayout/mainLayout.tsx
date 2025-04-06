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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Initial check

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    console.log("isMobile", isMobile); // ✅ This will now reflect the current value correctly
  }, [isMobile]);


  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
        <AudioPlayer />
        {/* left sidebar */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
          <Leftsidebar />
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

        {/* Main content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

            {/* right sidebar */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
              <RightBar />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <PlayMenu />
    </div>
  );
}
export default mainLayout;
