import { User } from "../models/user.model.js";

export const authcallback = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;
        //check if user already exists
        const user = await User.findOne({ clerkId : id });

        if (!user) {
            //signup
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl,
            });
            // const newUser = new User({
            //     fullName: `${firstName} ${lastName}`,
            //     imageUrl,
            //     clerkId,
            // });
            // await newUser.save();
        }
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

    }
}   
