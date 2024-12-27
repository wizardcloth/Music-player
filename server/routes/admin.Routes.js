import { Router } from "express";
import { getAdmin } from "../controller/admin.controller.js";
let router = Router();

router.get("/",getAdmin);

export default router;