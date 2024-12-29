import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button"
const SignINAuthButton = () => {
    const { signIn, isLoaded } = useSignIn();
    if (!isLoaded) return null;


    const signInwithGoogle = async () => {
        signIn.authenticateWithRedirect(
            {
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/authcallback"
            }
        )
    }
    return (
        <Button onClick={signInwithGoogle} className="w-full  bg-gray-400 border-zinc-400 h-11" variant={"secondary"}>
            Continue with Google
        </Button>
    )
}

export default SignINAuthButton