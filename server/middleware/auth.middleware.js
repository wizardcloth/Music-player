import admin from "../firebaseAdmin.js";

// Middleware to verify Firebase ID Token
export const protectRoute = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1]; // Extract token

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log("Decoded Token:", decodedToken);
    // const tokenExpiration = new Date(decodedToken.exp * 1000);
    // console.log('Token expiration time:', tokenExpiration);

    req.user = decodedToken; // Attach user data to the request object
    // console.log("User data:", req.user);
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
      return res.json({ message: "Forbidden" });
    }

    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error("Admin check error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
