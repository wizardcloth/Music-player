import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.user.uid;
        const users = await User.find({ firebaseId: { $ne: currentUserId } });

        res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error);
        next(error);
    }
};
