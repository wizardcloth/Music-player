import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        // const currentUserId = req.user._id;
        // console.log(req.user.user_id);
        const users = await User.find({ firebaseUID: { $ne: req.user.user_id }});
        // console.log(users);

        res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error);
        next(error);
    }
};
