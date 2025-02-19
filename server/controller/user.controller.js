import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
   try{
        const currentUser = req.user;
        // console.log(currentUser.user_id);
        const users = await User.find({ firebaseUID: { $ne: currentUser.user_id } });
        // console.log(users);

        res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error);
        next(error);
    }
};
