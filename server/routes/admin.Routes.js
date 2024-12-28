import { Router } from "express";
import { createSong, deleteSong, createAlbum, deleteAlbum } from "../controller/admin.controller.js";
import { protectRoute, Admin } from "../middleware/auth.middleware.js";
let router = Router();

// router.use(protectRoute, Admin); //protect all routes no need to write for each route individually

router.get("/check", protectRoute, Admin, (req, res) => {
    res.status(200).json({ admin: true });
});

router.post("/songs", protectRoute, Admin, createSong);
router.delete("/songs/:id", protectRoute, Admin, deleteSong);

router.post("/albums", protectRoute, Admin, createAlbum);
router.delete("/albums/:id", protectRoute, Admin, deleteAlbum);

export default router;