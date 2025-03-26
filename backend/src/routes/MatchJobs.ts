import express from "express";
import axios from "axios";
import User from "../models/User"; // Import User model

const router = express.Router();

// Route to get matched jobs for a user
router.post("/", async (req, res) => {
  try {
    const { email } = req.body; // Get email from frontend
    console.log(email);
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Find user from MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(user)
    // console.log(user._id)
    // Send request to Flask API with userId
    const flaskResponse = await axios.post("https://jobforcemlmodel.onrender.com/match-jobs", {
      userId: user._id.toString(),
    });

    // Extract recommended jobs from response
    const recommendedJobs = flaskResponse.data.recommended_jobs;

    return res.json({ recommendedJobs }); // Send response to frontend
  } catch (error) {
    // console.error("Error fetching job recommendations:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
