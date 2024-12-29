import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../lib/axios.ts";
import { Loader } from "lucide-react";

const updateApiToken = (token: string | null) => {
    if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common['Authorization'];
}
const authProvider = ({children}:{children:React.ReactNode}) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initauth = async () => {
            try {
                const token = await getToken();
                // console.log(token);
                updateApiToken(token);
            }
            catch (error) {
                console.error(error);
                updateApiToken(null);
            } finally {
                setLoading(false);
            }
        };
        initauth();
    }, [getToken]);

    if(loading) return (
        <div className="h-screen flex justify-center items-center">
            <Loader className="size-15 text-blue-500 animate-spin"/>
        </div>
    )
    return(
        <div>{children}</div>
    )
}

export default authProvider