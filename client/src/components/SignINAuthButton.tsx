import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignInAuthButton = () => {
    const [signInWithGoogle ,, loading] = useSignInWithGoogle(auth);
    const navigate = useNavigate();

    const handleSignIn = async () => {
        await signInWithGoogle();
        navigate("/authcallback"); // Ensure the user is redirected to AuthCallback
    };

    return (
        <Button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-emerald-600 border-zinc-400 h-11 hover:text-emerald-400 hover:underline underline-offset-2 "
            variant="ghost"
        >
            {loading ? <Loader className="size-5 animate-spin" /> : <span className="text-sm text-white font-bold">Sign In with Google</span>}
        </Button>
    );
};

export default SignInAuthButton;
