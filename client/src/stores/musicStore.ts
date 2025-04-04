// useMusicStore.ts
import { create } from "zustand";
import { createHeader } from "@/AuthProvider/authProvider"; // import from the utility file
import axiosInstance from "../lib/axios";
import { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isloading: boolean;
    error: string | null;
    currentAlbum: null | Album;
    featuredSongs: Song[];
    MadeForYou: Song[];
    TrendingSongs: Song[];
    stats: Stats;
    fetchAlbums: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (id: string) => {};
    deleteAlbum: (id: string) => Promise<void>;
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
    featuredSongs: [],
    MadeForYou: [],
    TrendingSongs: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
    },

    fetchAlbums: async () => {
        set({ isloading: true, error: null });
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
    fetchSongs: async () => {
        set({ isloading: true, error: null });
        const header = await createHeader();
        if (!header) {
            return;
        }
        try {
            const response = await axiosInstance.get("/songs", header);
            set({ songs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isloading: false });
        }
    },

    deleteSong: async (id) => {
        set({ isloading: true, error: null });
        const header = await createHeader();
        try {
            await axiosInstance.delete(`/admin/songs/${id}`, header);
            set((prev) => ({
                songs: prev.songs.filter(song => song._id !== id)
            }))
            toast.success("deleted successfully");

        } catch (error: any) {
            set({ error: error.response.data.message });
            toast.error("error deleting Song")
        } finally {
            set({ isloading: false });
        }

    },
    deleteAlbum: async (id) => {
        set({ isloading: true, error: null });
        const header = await createHeader();
        try {
            await axiosInstance.delete(`/admin/albums/${id}`, header);
            set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));

            toast.success("deleted successfully");

        } catch (error: any) {
            set({ error: error.response.data.message });
            toast.error("error deleting Album")
        } finally {
            set({ isloading: false });
        }

    },

    fetchStats: async () => {
        set({ isloading: true, error: null });
        const header = await createHeader();
        if (!header) {
            return;
        }
        // console.log(header)
        try {
            const response = await axiosInstance.get("/stats", header);
            set({ stats: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
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
