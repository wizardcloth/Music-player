import { LayoutDashboardIcon } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import SignInAuthButton from "./SignINAuthButton.tsx";
// import { useAuthContext } from "@/stores/useAuthStore.tsx";
import { useAuthStore } from "@/stores/useAuthStore.tsx";
const Topbar = () => {
    const [user, loading] = useAuthState(auth);
    const { isAdmin } = useAuthStore();
    const handleSignout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }
    // const isAdmin = false;    // Update this ic as needed
    return (
        <div className="flex justify-between items-center h-16 bg-zinc-800 m-2 rounded text-white backdrop:blur-md">
            <div className="hidden sm:inline gap-2 items-center m-4"><img src="/logo.webp" alt="" className="hidden sm:inline-block mr-2 size-7 rounded-sm" />
                Music
            </div>
            <div className="flex items-center m-4">
                {isAdmin && (
                    <div className="flex gap-0 mx-4 items-center hover:bg-zinc-700 hover:text-emerald-400 p-2 rounded-md ">
                        <LayoutDashboardIcon className="size-4 mr-2 " />
                        <a href="/admin" >Admin</a>
                    </div>
                )}
                {loading ? (
                    <span className="text-sm">Loading...</span>
                ) : user ? (
                    <button onClick={() => handleSignout()} className="text-sm font-medium hover:underline underline-offset-2 bg-emerald-600 p-2 rounded-md">
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
