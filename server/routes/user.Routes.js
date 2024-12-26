import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/",(req,res)=>{
    res.send("hello world");
})

export default userRoutes;