import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/songs.controller.js";
import { protectRoute, Admin } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", protectRoute, Admin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("madeforyou", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);


export default router;