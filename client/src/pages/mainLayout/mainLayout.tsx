import { Outlet } from "react-router-dom"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Leftsidebar from "./components/leftsidebar";
function mainLayout() {
  const ismobile = false;
  return (

    <div className="h-screen flex flex-col">
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
          right bar
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default mainLayout