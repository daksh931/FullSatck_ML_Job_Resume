import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import uploadRoutes from "./routes/upload";
import authRoutes from "./routes/authRoutes";

// dotenv.config();

const app = express();

app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// database
app.get("/", (req,res) => {
    res.json({
        message: "working job protal"
    })
})
app.use("/api/upload", uploadRoutes);
export default app;