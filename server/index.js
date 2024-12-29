import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.js";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

import userRoutes from "./routes/user.Routes.js"
import adminRoutes from "./routes/admin.Routes.js"
import authRoutes from "./routes/auth.Routes.js"
import songsRoutes from "./routes/songs.Routes.js"
import albumRoutes from "./routes/album.Routes.js"
import statsRoutes from "./routes/stats.Routes.js"

const __dirname = path.resolve();
const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,"tmp"),
    createParentPath:true,
    limits: { fileSize: 10 * 1024 * 1024 }, //10mb
}));
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials:true
    }
));

let port = process.env.port;

app.use("/api/users",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/songs",songsRoutes);
app.use("/api/album",albumRoutes);
app.use("/api/stats",statsRoutes);

//error handler
app.use((err,req,res,next)=>{
    return res.status(500).json({message:process.env.NODE_ENV === "production" ? "Internal server error" : err.message});
})

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log(`server is started at http://localhost:${port}/`);
    connectDB();
})


