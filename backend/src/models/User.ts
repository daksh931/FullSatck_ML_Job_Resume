import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true },
    email: {type:String, required:true, unique:true },
    password: {type:String, required:true },
    resumeUrl: { type: String, default: null },
    jobs:[{type: mongoose.Schema.Types.ObjectId , ref:"Job"}]
},
{timestamps: true})

const User = mongoose.model("User", userSchema);
export default User;
  