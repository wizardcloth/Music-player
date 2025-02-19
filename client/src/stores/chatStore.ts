// useChatStore.ts
import { create } from "zustand";
import { createHeader } from "@/AuthProvider/authProvider"; // import from the utility file
import axiosInstance from "@/lib/axios";

interface ChatStore {
    users: string[];
    isLoading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
}   

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const header = await createHeader();
            const response = await axiosInstance.get("/users", header);
            set({ users: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Error fetching users" });
        } finally {
            set({ isLoading: false });
        }
    },
}));
