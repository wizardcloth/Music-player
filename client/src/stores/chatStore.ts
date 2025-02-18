import axiosInstance from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
    users: string[];
    isLoading: boolean;
    error: string | null;
    fetchUsers: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axiosInstance.get("/users");

            set({ users: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Error fetching users" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
