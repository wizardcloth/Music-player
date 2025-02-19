import { auth } from "@/lib/firebase";

export const getUserToken = async () => {
    const user = auth.currentUser;
    if (!user) {
        return null; // Return null if the user is not authenticated
    }
    const token = await user.getIdToken();
    return token;
};

export const createHeader = async () => {
    const token = await getUserToken();
    if (!token) {
        console.error("No token found. User is not authenticated.");
        return {}; // Return empty headers if no token is found
    }
    
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
};
