import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Blog from '../models/Blog.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Multer in-memory setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload helper
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'blogs' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
};

// POST /api/blogs
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, summary, content } = req.body;

    console.log("📦 Received file:", req.file);

    if (!title || !author || !content) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    let imageUrl = '';

    if (req.file?.buffer) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const newBlog = new Blog({
      title,
      author,
      summary,
      content,
      image: imageUrl
    });

    await newBlog.save();

    res.status(201).json({ message: '✅ Blog created', blog: newBlog });

  } catch (err) {
    console.error('❌ Blog creation error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
