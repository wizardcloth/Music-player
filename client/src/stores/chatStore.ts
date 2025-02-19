import axiosInstance from "@/lib/axios";
import { create } from "zustand";
import { auth } from "@/lib/firebase";
interface ChatStore {
    users: string[];
    isLoading: boolean;
    error: string | null;
    fetchUsers: () => void;
}   
const getUserToken = async () => {
    const user = auth.currentUser;
    if (!user) {
        return null; // Return null if user is not authenticated
    }
    const token = await user.getIdToken();
    return token;
};

const createHeader = async () => {
    const token = await getUserToken();
    
    // console.log("Token:", token); // Add this line for debugging
    const payloadHeader = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    return payloadHeader;
};

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const header = await createHeader();
            const response = await axiosInstance.get("/users",header);

            set({ users: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Error fetching users" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
