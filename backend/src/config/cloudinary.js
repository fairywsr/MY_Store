// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  return cloudinary;  // ✅ return the configured object
};

export default connectCloudinary;
