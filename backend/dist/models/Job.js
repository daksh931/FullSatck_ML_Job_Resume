"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define Job Schema with simple fields
const JobSchema = new mongoose_1.default.Schema({
    jobId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    description: { type: String },
    companyWebsiteUrl: { type: String },
    location: { type: String },
    publishedAt: { type: Date },
});
const Job = mongoose_1.default.model("Job", JobSchema);
exports.default = Job;
