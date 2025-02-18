import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { auth } from "../lib/firebase.ts";
import axiosInstance from "../lib/axios";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for token refresh
        const unsubscribe = auth.onIdTokenChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken(true);
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader className="size-15 text-blue-500 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthProvider;
