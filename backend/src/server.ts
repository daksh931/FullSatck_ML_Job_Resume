import { error } from "console";
import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose.connect(MONGO_URI as string)
.then( ()=> {
    console.log("successfully Connected to MongoDB");
    app.listen(PORT, ()=> {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}).catch( (error)=> {
    console.log("MongoDB connection error:", error)
});


