import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();
export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
        return res.status(401).json({message: "Unauthorized"});
    }
    next();
};

export const Admin = async (req, res, next) => {
    try {
        const currentuser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.Admin_email === currentuser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
            return res.status(401).json({message: "Unauthorized"});
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}