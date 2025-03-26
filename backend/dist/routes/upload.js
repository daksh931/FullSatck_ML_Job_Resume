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
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
// Ensure function signature matches Express RequestHandler
const uploadHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const file = req.file;
        const fileKey = `resumes/${(0, crypto_1.randomUUID)()}_${file.originalname}`;
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
            // ACL: "public-read",
        };
        yield s3Client.send(new client_s3_1.PutObjectCommand(uploadParams));
        const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        const { email } = req.body;
        if (!email) {
            res.status(400).send("Email is required.");
        }
        yield User_1.default.updateOne({ email }, { resumeUrl: fileUrl });
        res.json({ fileUrl });
        // console.log(fileUrl);
    }
    catch (err) {
        console.error("S3 Upload Error:", err);
        res.status(500).json({ error: "Error uploading file" });
    }
});
const router = require("express").Router();
router.post("/", upload.single("resume"), uploadHandler);
exports.default = router;
