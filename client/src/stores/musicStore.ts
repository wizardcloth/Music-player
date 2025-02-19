import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { Album, Song } from "@/types";  //@ means in src done by shadcn
import { auth } from "../lib/firebase";

const getUserToken = async () => {
    const user = auth.currentUser;
    if (!user) {
        return null;  // Return null if the user is not authenticated
    }
    const token = await user.getIdToken();
    return token;
};

const createHeader = async () => {
    const token = await getUserToken();
    if (!token) {
        console.error("No token found. User is not authenticated.");
        return {};  // Return an empty object if no token
    }
    
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
};


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
        const header = await createHeader();
        try {
            const response = await axiosInstance.get("/albums",header);
            set({ albums: response.data })

        } catch (error: any) {
            console.log(error)
            // set({ error: error.response.data.message })
        } finally {
            set({ isloading: false })
        }
    },

    fetchAlbumsById: async (albumId: string) => {
        set({ isloading: true, error: null });
        const header = await createHeader();
        try {
            const response = await axiosInstance.get(`/albums/${albumId}`,header);
            // console.log(response.data.songs)
            set({ currentAlbum: response.data })

        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({ isloading: false })
        }
    }



})); 