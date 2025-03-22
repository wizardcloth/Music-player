import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controller/album.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

let router = Router();

router.get("/", getAllAlbums); 
router.get("/:albumId",getAlbumById); 

export default router;
