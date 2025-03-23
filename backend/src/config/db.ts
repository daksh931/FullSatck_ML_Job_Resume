import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected Successfully")
    } catch (error) {
        console.log("MongoDB connection falied: ",error);
        process.exit(1);
    }
}

export default connectDB;