import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect} from "react";
import { auth } from "../lib/firebase.ts"; // Import Firebase auth instance
import axiosInstance from "../lib/axios";
import { Loader } from "lucide-react";

const updateApiToken = async (user: any) => {
    if (user) {
        const token = await user.getIdToken();
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        updateApiToken(user);
    }, [user]);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader className="size-15 text-blue-500 animate-spin" />
            </div>
        );
    }

    return <div>{children}</div>;
};

export default AuthProvider;
