import { Router } from "express";
import {getAllUsers} from "../controller/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
const userRoutes = Router();

userRoutes.get("/",protectRoute,getAllUsers);
//get messages route

export default userRoutes;