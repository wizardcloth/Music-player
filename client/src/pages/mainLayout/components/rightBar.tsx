import { useChatStore } from "@/stores/chatStore"
import { useEffect } from "react";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { HeadphonesIcon, Users, Music,CircleUserRound} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
function RightBar() {
    const { users, fetchUsers } = useChatStore();
    
    const [user] = useIdToken(auth);
    const isPlaying = true;

    useEffect(() => {
        async function users() {
            if (user) {
               await fetchUsers();  
            }
        }
        users();
    }, [user, fetchUsers]);

    // console.log(users)

    return (
        <>
            {
                (!user) ? (<LoginPrompt />) : (
                    <>
                        
                        <div className='h-[calc(100vh-85px)] m-2 bg-zinc-900 rounded-lg flex flex-col'>
                            <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
                                <div className='flex items-center gap-2'>
                                    <Users className='size-5 shrink-0' />
                                    <h2 className='font-semibold'>What they're listening to</h2>

                                </div>
                            </div>
                            <ScrollArea className="flex-1">
                                <div className='flex flex-col gap-2 p-4'>
                                    {
                                        users.map((user: any) => (
                                            <div key={user._id} className='flex items-center gap-2'>
                                                <div className='relative'>
                                                    <CircleUserRound className='w-10 h-10 rounded-full'/>
                                                    <div
                                                        className={`${isPlaying ? 'bg-emerald-500' : 'bg-zinc-800'
                                                            } absolute bottom-0 right-0 w-3 h-3 border-2 border-zinc-900 rounded-full`}
                                                    />

                                                </div>
                                                <div className='flex flex-col'>
                                                    <h3 className='font-semibold text-white'>{user.fullName}</h3>
                                                    {
                                                        (isPlaying) ? ( <p className="text-sm text-zinc-400">idle</p>) : (null) 
                                                    }

                                                </div>
                                                <div className="text-zinc-400 flex items-center flex-col">
                                                    {
                                                        (isPlaying) ? (<Music className="size-3.5 text-emerald-300 " />) : (null)
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </ScrollArea>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default RightBar

const LoginPrompt = () => (
    <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
        <div className='relative'>
            <div
                className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
                aria-hidden='true'
            />
            <div className='relative bg-zinc-900 rounded-full p-4'>
                <HeadphonesIcon className='size-8 text-emerald-400' />
            </div>
        </div>

        <div className='space-y-2 max-w-[250px]'>
            <h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
            <p className='text-sm text-zinc-400'>Login to discover what music your friends are enjoying right now</p>
        </div>
    </div>
);
