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
const cors_1 = __importDefault(require("cors"));
const upload_1 = __importDefault(require("./routes/upload"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const MatchJobs_1 = __importDefault(require("./routes/MatchJobs"));
const axios_1 = __importDefault(require("axios"));
const Job_1 = __importDefault(require("./models/Job"));
// dotenv.config();
const app = (0, express_1.default)();
// app.use(cors());
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express_1.default.json());
// wrporking on ec2 
// const corsOptions = {
//   origin: 'https://full-satck-ml-job-resume.vercel.app',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP met>
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
// };
// app.use(cors(corsOptions));
// Routes
app.use("/api/auth", authRoutes_1.default);
// database
app.get("/", (req, res) => {
    res.json({
        message: "working job protal"
    });
});
app.get("/api/jobs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const options = {
        method: 'GET',
        url: 'https://jobdataapi.com/api/jobs/?country_code=IN&max_age=30'
    };
    try {
        const response = yield axios_1.default.request(options);
        // console.log(response.data);
        const jobsArray = ((_a = response.data.results) === null || _a === void 0 ? void 0 : _a.slice(0, 100)) || [];
        if (!Array.isArray(jobsArray)) {
            throw new Error("Invalid response format, expected an array");
        }
        // const insertedJobs = await Job.insertMany(jobsArray, { ordered: false });
        const jobData = jobsArray.map(job => {
            var _a;
            return ({
                jobId: job.id,
                title: job.title,
                description: job.description,
                companyName: job.company.name,
                companyWebsiteUrl: job.company.website_url,
                location: (_a = job.countries[0]) === null || _a === void 0 ? void 0 : _a.name,
                publishedAt: job.published,
            });
        });
        res.json(jobsArray);
        const result = yield Job_1.default.insertMany(jobData);
        console.log("✅ Successfully inserted", result.length, "jobs into the database.");
        return res.json({ jobsArray });
    }
    catch (error) {
        console.error(error);
    }
}));
app.use("/api/upload", upload_1.default);
app.use("/api/matchJobs", MatchJobs_1.default);
exports.default = app;
