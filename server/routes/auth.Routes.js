import { Router } from "express";
import { authcallback } from "../controller/auth.controller.js";
let router = Router();

router.post("/authcallback",authcallback);

export default router;