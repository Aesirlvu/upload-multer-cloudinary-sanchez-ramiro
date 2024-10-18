import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { format } from "morgan";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinary_storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (_req, file) => {
    return {
      folder: "ipf_cloud_test",
      format: ["png", "jpg", "jpeg", "gif"],
      public_id: `${file.originalname} - ${crypto.randomUUID.toString()} `,
    };
  },
});

export const uploadCloudFile = multer({ storage: cloudinary_storage });
