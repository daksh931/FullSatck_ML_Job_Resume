import { Request, Response, RequestHandler } from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
import { exit } from "process";
import User from "../models/User";

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Extend the Express Request to include file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Ensure function signature matches Express RequestHandler
const uploadHandler: RequestHandler = async (
    req: MulterRequest,
    res: Response
  ): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }
  
      const file = req.file;
      const fileKey = `resumes/${randomUUID()}_${file.originalname}`;
      

      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: "public-read",
      };
  
      await s3Client.send(new PutObjectCommand(uploadParams));
  
      const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
  
      const { email } = req.body;
      if (!email) {
        res.status(400).send("Email is required.");
      }

      await User.updateOne({ email }, { resumeUrl:fileUrl });
      
      res.json({ fileUrl });
      
      // console.log(fileUrl);
    } catch (err) {
      console.error("S3 Upload Error:", err);
      res.status(500).json({ error: "Error uploading file" });
    }
  };
  

const router = require("express").Router();
router.post("/", upload.single("resume"), uploadHandler);

export default router;
