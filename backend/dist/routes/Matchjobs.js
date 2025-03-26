"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const User_1 = __importDefault(require("../models/User")); // Import User model
const router = express_1.default.Router();
// Route to get matched jobs for a user
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body; // Get email from frontend
        console.log(email);
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        // Find user from MongoDB
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // console.log(user)
        // console.log(user._id)
        // Send request to Flask API with userId
        const flaskResponse = yield axios_1.default.post("https://jobforcemlmodel.onrender.com/match-jobs", {
            userId: user._id.toString(),
        });
        // Extract recommended jobs from response
        const recommendedJobs = flaskResponse.data.recommended_jobs;
        return res.json({ recommendedJobs }); // Send response to frontend
    }
    catch (error) {
        // console.error("Error fetching job recommendations:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
