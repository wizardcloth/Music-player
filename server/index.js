import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

// Importing routes
import userRoutes from "./routes/user.Routes.js";
import adminRoutes from "./routes/admin.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import songsRoutes from "./routes/songs.Routes.js";
import albumRoutes from "./routes/album.Routes.js";
import statsRoutes from "./routes/stats.Routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "tmp",
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  })
);

app.use(
  cors({
    origin: "http://localhost:5173", // Change to your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  return res.status(500).json({
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

const connectToDatabase = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); // Exit if database connection fails
  }
};

// Default route
app.get("/", (req, res) => res.send("Serverless Express API"));

// Serverless function handler
export default async function handler(req, res) {
  await connectToDatabase();
  app(req, res);
}
