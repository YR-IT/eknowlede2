import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js'; // ✅ assumes config is done there
import Blog from '../models/Blog.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// ✅ Multer in-memory setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Cloudinary upload helper
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'blogs' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
};

// ✅ GET all blogs: GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('❌ Error fetching blogs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Create a blog post: POST /api/blogs
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, summary, content } = req.body;

    console.log("📦 Received file:", req.file);

    if (!title || !author || !content) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    let imageUrl = '';

    if (req.file?.buffer) {
      try {
        const uploadResult = await uploadToCloudinary(req.file.buffer);
        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error('❌ Cloudinary Upload Error:', uploadError);
        return res.status(500).json({ message: 'Cloudinary upload failed' });
      }
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