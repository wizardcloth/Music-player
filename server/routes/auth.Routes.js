import { Router } from "express";
import { authcallback } from "../controller/auth.controller.js";
let router = Router();

router.get("/",authcallback);

export default router;