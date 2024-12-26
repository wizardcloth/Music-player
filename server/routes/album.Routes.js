import { Router } from "express";

let router = Router();

router.get("/",(req,res)=>{
    res.send("hello world");
})

export default router;