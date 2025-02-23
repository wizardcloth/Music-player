// useMusicStore.ts
import { create } from "zustand";
import { createHeader } from "@/AuthProvider/authProvider"; // import from the utility file
import axiosInstance from "../lib/axios";
import { Album, Song } from "@/types";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isloading: boolean;
    error: string | null;
    currentAlbum: null | Album;
    featuredSongs: Song[];
    MadeForYou: Song[];
    TrendingSongs: Song[];
    fetchAlbums: () => Promise<void>;
    fetchAlbumsById: (albumId: string) => Promise<void>;
    fetchfeaturedSongs: () => Promise<void>;
    fetchMadeForYou: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    songs: [],
    albums: [],
    isloading: false,
    error: "null",
    currentAlbum: null,
    featuredSongs:[],
    MadeForYou:[],
    TrendingSongs:[],

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
    },
    fetchfeaturedSongs: async () => {
        set({ isloading: true });
        const header = await createHeader();
        try {
            const response = await axiosInstance.get("/songs/featured", header);
            set({ featuredSongs: response.data });
        } catch (error: any) {
            console.log(error);
        } finally {
            set({ isloading: false });
        }
    },
    fetchMadeForYou: async () => {
        set({ isloading: true });
        const header = await createHeader();
        try {
            const response = await axiosInstance.get("/songs/madeforyou", header);
            set({ MadeForYou: response.data });
        } catch (error: any) {
            console.log(error);
        } finally {
            set({ isloading: false });
        }

    },
    fetchTrendingSongs: async () => {
        set({ isloading: true });
        const header = await createHeader();
        try {
            const response = await axiosInstance.get("/songs/trending", header);
            set({ TrendingSongs: response.data });
        } catch (error: any) {
            console.log(error);
        } finally {
            set({ isloading: false });
        }

    },

}));
