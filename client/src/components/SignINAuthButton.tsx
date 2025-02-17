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
            className="w-full bg-gray-400 border-zinc-400 h-11"
            variant="secondary"
        >
            {loading ? <Loader className="size-5 animate-spin" /> : "Continue with Google"}
        </Button>
    );
};

export default SignInAuthButton;
