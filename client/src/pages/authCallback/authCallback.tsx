import { Card, CardContent } from "@/components/ui/card"
import axiosInstance from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
const authcallback = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const syncAttempt = useRef(false);

  useEffect(() => {
    const syncuser = async () => {
      try {
        if (!isLoaded || !user || syncAttempt.current) return;
        await axiosInstance.post("/auth/authcallback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        })
        syncAttempt.current = true;
      } catch (error) {
        console.error(error);
      } finally {
        navigate("/");
      }
    }
    syncuser();
  }, [isLoaded, user, navigate])
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-200 border-zinc-800">
        <CardContent className="flex flex-col gap-4 items-center pt-6">
          <Loader className="size-15 text-emerald-500 animate-spin" />
          <h1 className="text-xl font-bold">Authenticating...</h1>
          <p className="text-sm">Please wait while we authenticate you</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default authcallback