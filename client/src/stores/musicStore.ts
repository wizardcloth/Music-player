import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { Album, Song } from "@/types";  //@ means in src done by shadcn

interface MusicStore {
    music: Song[];
    albums: Album[];
    isloading: boolean;
    error: string | null;
    currentAlbum: null | Album,

    fetchAlbums: () => void;
    fetchAlbumsById: (albumId: string) => void;

}

export const useMusicStore = create<MusicStore>((set) => ({
    music: [],
    albums: [],
    isloading: false,
    error: "null",
    currentAlbum: null,


    fetchAlbums: async () => {
        set({ isloading: true });
        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data })

        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isloading: false })
        }
    },

    fetchAlbumsById: async (albumId: string) => {
        set({ isloading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${albumId}`);
            // console.log(response.data.songs)
            set({ currentAlbum: response.data })

        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isloading: false })
        }
    }



})); 