import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)),
    });
}

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split("Bearer ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Middleware to check if user is an admin
export const Admin = async (req, res, next) => {
    try {
        const userEmail = req.user.email;
        const isAdmin = process.env.ADMIN_EMAIL === userEmail;

        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        console.error("Admin check error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
