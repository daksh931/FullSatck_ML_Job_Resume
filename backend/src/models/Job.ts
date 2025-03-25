import mongoose from "mongoose";

// Define Job Schema with simple fields
const JobSchema = new mongoose.Schema({
  jobId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  companyName: { type: String, required: true },
  description: { type: String },
  companyWebsiteUrl: { type: String },
  location: { type: String },
  publishedAt: {type:Date},
});

const Job = mongoose.model("Job", JobSchema);
export default Job;
