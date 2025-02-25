import { createHeader } from '@/AuthProvider/authProvider';
import axiosInstance from '@/lib/axios';
import {create} from 'zustand';

interface Authstore {
    isAdmin: boolean;
    error: string | null;
    isloading: boolean;
    checkAdmin: () => Promise<void>;
    reset: () => void;
}
export const useAuthStore = create<Authstore>((set)=>({
    isAdmin: false,
    error: null,
    isloading: false,
    checkAdmin: async () => {
        set({isloading: true,error: null});
        try {
            const header = await createHeader();
            const response = await axiosInstance.get("/admin/check",header);
            set({isAdmin: response.data.admin});
        } catch (error:any) {
            set({isAdmin: false});
        } finally {
            set({isloading: false});
        }
    },
    reset: () => set({isAdmin: false,error: null,isloading: false}),
}));