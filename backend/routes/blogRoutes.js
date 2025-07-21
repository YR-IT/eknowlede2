import express from 'express';
import multer from 'multer';
import Blog from '../models/Blog.js';

const router = express.Router();

// Multer config (in-memory storage)
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

// POST /api/blogs
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, summary, content } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null;

    if (!title || !author || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBlog = new Blog({
      title,
      author,
      summary,
      content,
      image: imageBuffer, // store as Buffer (or store as URL if uploaded elsewhere)
    });

    await newBlog.save();
    res.status(201).json({ message: "✅ Blog created successfully" });
  } catch (err) {
    console.error("❌ Error saving blog:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
