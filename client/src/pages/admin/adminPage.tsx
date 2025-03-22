import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/header";
import DashboardStats from "./components/dashboard";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/musicStore";
import SongTab from "./components/songTab";
import AlbumTab from "./components/albumTab";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


const AdminPage = () => {
    const { isAdmin , isLoading } = useAuthStore();

    const { fetchAlbums, fetchSongs ,fetchStats} = useMusicStore();
    if(!isAdmin && !isLoading){
        return <div>Unauthorized</div>
    }

    useEffect(() => {
        async function createHeader() {
            if (isAdmin) {
                await Promise.all([fetchAlbums(), fetchSongs(), fetchStats()]);
            }
        }
        createHeader();
    }, [fetchAlbums, fetchSongs,fetchStats, auth, useAuthState]);

    return (
        <div
            className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8'
        >
            <Header />

            <DashboardStats />

            <Tabs defaultValue='songs' className='space-y-6'>
                <TabsList className='p-1 bg-zinc-800/50'>
                    <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
                        <Music className='mr-2 size-4' />
                        Songs
                    </TabsTrigger>
                    <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700'>
                        <Album className='mr-2 size-4' />
                        Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='songs'>
                    <SongTab />
                </TabsContent>
                <TabsContent value='albums'>
                    <AlbumTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};
export default AdminPage;
