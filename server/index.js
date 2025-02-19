import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

// import { protectRoute } from "./middleware/auth.middleware.js";
import userRoutes from "./routes/user.Routes.js";
import adminRoutes from "./routes/admin.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import songsRoutes from "./routes/songs.Routes.js";
import albumRoutes from "./routes/album.Routes.js";
import statsRoutes from "./routes/stats.Routes.js";

const __dirname = path.resolve();
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  })
);

app.use(cors({
  origin: 'http://localhost:5173', // or '*' to allow all origins (not recommended in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// app.use(protectRoute);

const port = process.env.PORT || 8080; // Default port fallback

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err); // Debugging
  return res.status(500).json({
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}/`);
  connectDB();
});
