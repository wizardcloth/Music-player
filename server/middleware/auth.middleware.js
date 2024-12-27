import { clerkClient } from "@clerk/express";

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
        return res.status(500).json({message: "Something went wrong"});
    }
}