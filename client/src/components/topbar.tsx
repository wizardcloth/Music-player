import { LayoutDashboardIcon } from "lucide-react";
import { SignedIn,SignedOut, SignOutButton } from "@clerk/clerk-react";
import SignINAuthButton from "./SignINAuthButton";
const topbar = () => {
    const isAdmin = false;
  return (
    <div className="flex justify-between items-center h-16 bg-gray-800 text-white backdrop:blur-md ">
        <div className="flex gap-2 items-center m-4">
            Spotify
        </div>
        <div className="flex gap-2 items-center m-4">
            {
                isAdmin && (
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                            <LayoutDashboardIcon className="size-4 mr-2"/>
                            <a href="/admin" className="hover:underline">Admin Dashboard</a>
                        </div>
                    </div>
                )
            }
            <SignedIn>
                <SignOutButton/>
            </SignedIn>
                
            <SignedOut>
                <SignINAuthButton/>
            </SignedOut>
        </div>
    </div>
  )
}

export default topbar