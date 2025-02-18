import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // 🔍 Check if user already exists
        let user = await User.findOne({ firebaseUID: id });

        if (user) {
            console.log("User already exists:");
        } else {
            user = await User.create({
                firebaseUID: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl,
            });
            console.log("User created successfully:", user);
        }

        res.status(201).json({ message: "User authenticated successfully", user });
    } catch (error) {
        console.error("Error during authentication callback:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
