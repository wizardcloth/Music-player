import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import userRoutes from "./routes/user.Routes.js"
import adminRoutes from "./routes/admin.Routes.js"
import authRoutes from "./routes/auth.Routes.js"
import songsRoutes from "./routes/songs.Routes.js"
import albumRoutes from "./routes/album.Routes.js"
import statsRoutes from "./routes/stats.Routes.js"

const app = express();
dotenv.config();


let port = process.env.port;

app.use("/api/users",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/songs",songsRoutes);
app.use("/api/album",albumRoutes);
app.use("/api/stats",statsRoutes);

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log(`server is started at http://localhost:${port}/`);
    connectDB();
})


