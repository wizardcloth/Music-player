// useMusicStore.ts
import { create } from "zustand";
import { createHeader } from "@/AuthProvider/authProvider"; // import from the utility file
import axiosInstance from "../lib/axios";
import { Album, Song } from "@/types";

interface MusicStore {
    music: Song[];
    albums: Album[];
    isloading: boolean;
    error: string | null;
    currentAlbum: null | Album;
    fetchAlbums: () => Promise<void>;
    fetchAlbumsById: (albumId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    music: [],
    albums: [],
    isloading: false,
    error: "null",
    currentAlbum: null,

    fetchAlbums: async () => {
        set({ isloading: true });
        const header = await createHeader();
        try {
            const response = await axiosInstance.get("/albums", header);
            set({ albums: response.data });
        } catch (error: any) {
            console.log(error);
        } finally {
            set({ isloading: false });
        }
    },

    fetchAlbumsById: async (albumId: string) => {
        set({ isloading: true, error: null });
        const header = await createHeader();
        try {
            const response = await axiosInstance.get(`/albums/${albumId}`, header);
            set({ currentAlbum: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isloading: false });
        }
    }
}));
