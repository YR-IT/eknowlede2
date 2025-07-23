import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import Blog from '../models/Blog.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'blogs' },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary Upload Error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(buffer);
  });
};

// ✅ GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('❌ Error fetching blogs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ CREATE new blog
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, author, summary, content, createdAt, date, headerImage } = req.body;
    let imageUrl = '';

    console.log("📥 Incoming blog:", { title, author, summary });

    if (req.file?.buffer) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    } else if (headerImage) {
      imageUrl = headerImage;
    } else {
      imageUrl = 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image';
    }

    const newBlog = new Blog({
      title,
      author,
      summary,
      content,
      headerImage: imageUrl,
      createdAt: Number(createdAt) || Date.now(),
      date: date || new Date().toLocaleDateString('en-GB')
    });

    await newBlog.save();
    res.status(201).json({ message: '✅ Blog created', blog: newBlog });
  } catch (err) {
    console.error('❌ Blog creation error:', err);
    res.status(500).json({ message: 'Failed to create blog', error: err.message });
  }
});

// ✅ UPDATE blog
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, author, summary, content, headerImage } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.summary = summary || blog.summary;
    blog.content = content || blog.content;

    if (req.file?.buffer) {
      const result = await uploadToCloudinary(req.file.buffer);
      blog.headerImage = result.secure_url;
    } else if (headerImage !== undefined) {
      blog.headerImage = headerImage;
    }

    await blog.save();
    res.json({ message: '✅ Blog updated', blog });
  } catch (err) {
    console.error('❌ Blog update error:', err);
    res.status(500).json({ message: 'Failed to update blog', error: err.message });
  }
});

// ✅ DELETE blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json({ message: '✅ Blog deleted', id: blog._id });
  } catch (err) {
    console.error('❌ Blog deletion error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

export default router;
