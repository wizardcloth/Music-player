import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

let router = Router();

router.get("/", getAllAlbums); // Protect route with Firebase authentication
router.get("/:albumId",getAlbumById); // Protect route with Firebase authentication

export default router;
