import Topbar from "@/components/topbar";
import FeaturedSection from "./components/featuredSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/musicStore";
import Sectiongrids from "./components/sectiongrid";
import { useEffect } from "react";
import { usePlayerStore } from "@/stores/playerStore";

const homepage = () => {
  const { featuredSongs, MadeForYou, TrendingSongs, isloading } = useMusicStore();
  const { initializeQueue } = usePlayerStore()
  useEffect(() => {
    if (MadeForYou.length > 0 && featuredSongs.length > 0 && TrendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...MadeForYou, ...TrendingSongs];
      initializeQueue(allSongs);

    }
  }, [initializeQueue, MadeForYou, TrendingSongs, featuredSongs]);
  return (
    <div className="h-[100vh]">
      <Topbar />
      <ScrollArea className="h-[80vh] m-2 rounded-md">
        <FeaturedSection />
        <div>
          <Sectiongrids title="Made for you" songs={MadeForYou} isLoading={isloading} />
          <Sectiongrids title="Trending songs" songs={TrendingSongs} isLoading={isloading} />
        </div>
      </ScrollArea>

    </div>
  )
}

export default homepage