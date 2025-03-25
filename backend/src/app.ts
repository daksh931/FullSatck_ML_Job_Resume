import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import uploadRoutes from "./routes/upload";
import authRoutes from "./routes/authRoutes";
import axios from "axios"
import Job from "./models/Job";
// dotenv.config();

const app = express();

app.use(cors());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// database
app.get("/", (req,res) => {
  
    res.json({
        message: "working job protal"
    })
})


app.get("/api/jobs", async (req,res) => {
    
    const options = {
        method: 'GET',
        url: 'https://jobdataapi.com/api/jobs/?country_code=IN&max_age=30'
      };
  
    try {
		const response = await axios.request(options);
		// console.log(response.data);
    const jobsArray = response.data.results?.slice(0,100) || [];

    if (!Array.isArray(jobsArray)) {
      throw new Error("Invalid response format, expected an array");
    }

    // const insertedJobs = await Job.insertMany(jobsArray, { ordered: false });
    const jobData = jobsArray.map(job => ({
      jobId: job.id,
      title: job.title,
      description: job.description,
      companyName: job.company.name,
      companyWebsiteUrl: job.company.website_url,
      location: job.countries[0]?.name,
      publishedAt: job.published,
    }));

    res.json(jobsArray);
     const result = await Job.insertMany(jobData);
    console.log("✅ Successfully inserted", result.length, "jobs into the database.");
    return res.json({jobsArray});
	} catch (error) {
		console.error(error);
	}
  });
  


app.use("/api/upload", uploadRoutes);
export default app;