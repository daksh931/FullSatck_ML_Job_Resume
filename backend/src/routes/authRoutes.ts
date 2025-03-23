import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { authMiddleware } from "../middleware/authMiddleware";
import {signup} from "../controllers/userController";

const router = express.Router();



router.post("/signup",signup)


// Login Route
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
 
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      
      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      });
      
      res.json({ token, userId: user._id, name: user.name });
      return;
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
//   // Get User Route (Protected)
  router.get("/user", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await User.findById(decoded.id).select("-password");
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
  export default router;