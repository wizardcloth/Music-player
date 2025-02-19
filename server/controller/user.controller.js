import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
   try{
        const users = await User.find({});
        // console.log(users);

        res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error);
        next(error);
    }
};
