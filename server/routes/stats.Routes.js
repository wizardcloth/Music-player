import { Router } from "express";
import { getStats } from "../controller/stats.controller.js";
import { protectRoute, Admin } from "../middleware/auth.middleware.js";
let router = Router();

router.get("/", protectRoute, Admin, getStats);

export default router;