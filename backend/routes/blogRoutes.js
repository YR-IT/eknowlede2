import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import Blog from '../models/Blog.js';

const router = express.Router();

// ✅ Multer in-memory config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Helper: Upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'blogs' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// ✅ GET /api/blogs — fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('❌ GET /blogs error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ POST /api/blogs — create new blog
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, summary, content, headerImage, date, createdAt } = req.body;

    if (!title || !author || !summary || !content) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    let imageUrl = headerImage || '';
    if (req.file?.buffer) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const newBlog = new Blog({
      title,
      author,
      summary,
      content,
      headerImage: imageUrl || undefined,
      date: date || new Date().toLocaleDateString('en-GB'),
      createdAt: createdAt ? Number(createdAt) : Date.now(),
    });

    await newBlog.save();
    res.status(201).json({ message: '✅ Blog created', blog: newBlog });

  } catch (err) {
    console.error('❌ POST /blogs error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// ✅ PUT /api/blogs/:id — update existing blog
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, author, summary, content, headerImage, date } = req.body;
    const blogId = req.params.id;

    if (!title || !author || !summary || !content) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const updateFields = {
      title,
      author,
      summary,
      content,
      date: date || new Date().toLocaleDateString('en-GB'),
    };

    if (req.file?.buffer) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      updateFields.headerImage = uploadResult.secure_url;
    } else if (headerImage) {
      updateFields.headerImage = headerImage;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });

    res.json({ message: '✅ Blog updated', blog: updatedBlog });

  } catch (err) {
    console.error('❌ PUT /blogs/:id error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// ✅ DELETE /api/blogs/:id — remove blog
router.delete('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });

    res.json({ message: '✅ Blog deleted', id: deletedBlog._id });

  } catch (err) {
    console.error('❌ DELETE /blogs/:id error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
