import express from 'express';
import multer from 'multer';
import Blog from '../models/Blog.js';

const router = express.Router();

// ✅ Multer config (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: limit to 5MB
});

// ✅ Blog creation route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, summary, content } = req.body;
    const file = req.file;

    // ✅ Basic validation
    if (!title || !author || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Optional: ensure image is uploaded
    if (!file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const newBlog = new Blog({
      title,
      author,
      summary,
      content,
      image: file.buffer, // Buffer saved directly
    });

    await newBlog.save();
    console.log("✅ Blog saved to MongoDB");

    res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    console.error("❌ Error saving blog:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
