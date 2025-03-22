import {create} from 'zustand';
import axiosInstance from '@/lib/axios';
import { createHeader } from '@/AuthProvider/authProvider';

interface AuthStore {
  isAdmin: boolean;
  error: string | null;
  isLoading: boolean;
  checkAdminStatus: (user: any) => Promise<void>;  // Accepts user as argument
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  error: null,
  isLoading: false,
  checkAdminStatus: async (user) => {
    set({ isLoading: true, error: null });
    try {
      if (!user) {
        set({ isAdmin: false });
        return;
      }
      const header = await createHeader();
      const response = await axiosInstance.get("/admin/check", header);
      set({ isAdmin: response.data.admin });
    } catch (error: any) {
      set({ error: error.message, isAdmin: false });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => set({ isAdmin: false, error: null, isLoading: false }),
}));
