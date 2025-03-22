import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.url);
        console.log(`database connected at ${conn.connection.host}`);

    } catch (error) {
        console.log("some error occurred");
        console.log(error);
        process.exit(1); // 0 = success, 1 = faliure
    }
}