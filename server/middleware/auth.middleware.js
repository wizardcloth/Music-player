import admin from "../firebaseAdmin.js";

// Middleware to verify Firebase ID Token
export const protectRoute = async (req, res, next) => {
    // console.log("Received Authorization header:", req.headers.authorization); // Log the token

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("No token found in request.");
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        // console.log("Decoded Token:", decodedToken); // Log decoded user info

        req.user = decodedToken; // Attach user data to request object
        
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


// Admin Middleware (Only allows specific users)
export const Admin = async (req, res, next) => {
    try {
        const user = await admin.auth().getUser(req.user.uid);

        if (user.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ message: "Forbidden: Admin only" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
