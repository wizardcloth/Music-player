import { LayoutDashboardIcon } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import SignInAuthButton from "./SignINAuthButton.tsx";

const Topbar = () => {
    const [user, loading] = useAuthState(auth);
    const isAdmin = false; // Update this logic as needed

    return (
        <div className="flex justify-between items-center h-16 bg-zinc-800 m-2 rounded text-white backdrop:blur-md">
            <div className="flex gap-2 items-center m-4"><img src="/spotify.png" alt="" className="size-7 rounded-sm"/>Music</div>
            <div className="flex gap-2 items-center m-4">
                {isAdmin && (
                    <div className="flex gap-2 items-center">
                        <LayoutDashboardIcon className="size-4 mr-2" />
                        <a href="/admin" className="hover:underline">Admin Dashboard</a>
                    </div>
                )}
                {loading ? (
                    <span className="text-sm">Loading...</span>
                ) : user ? (
                    <button onClick={() => signOut(auth)} className="text-sm hover:underline">
                        Sign Out
                    </button>
                ) : (
                    <SignInAuthButton />
                )}
            </div>
        </div>
    );
};

export default Topbar;
