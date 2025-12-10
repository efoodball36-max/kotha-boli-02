import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

export function initCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  // Debug (প্রথম রানেই যাচাই করতে সাহায্য করবে; কাজ ঠিক হলে চাইলে মুছে দিতে পারো)
  console.log('Cloudinary ENV:', CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY ? '***' : 'missing', CLOUDINARY_API_SECRET ? '***' : 'missing');

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary env missing');
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
  });

  return cloudinary;
}
