import Topbar from "@/components/topbar";
import FeaturedSection from "./components/featuredSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/musicStore";
import Sectiongrids from "./components/sectiongrid";

const homepage = () => {
  const {MadeForYou,TrendingSongs,isloading} = useMusicStore();
  return (
    <div>
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <FeaturedSection />
        <div>
          <Sectiongrids title="Made for you" songs={MadeForYou} isLoading={isloading}/>
          <Sectiongrids title="Trending songs" songs={TrendingSongs} isLoading={isloading}/>
        </div>
      </ScrollArea>

    </div>
  )
}

export default homepage