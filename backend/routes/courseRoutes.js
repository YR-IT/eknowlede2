import express from 'express';
import Course from '../models/course.js';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

// ✅ GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ message: 'Server error while fetching courses.' });
  }
});


// ✅ POST simple course (no video)
router.post('/', async (req, res) => {
  try {
    console.log("📩 Incoming course data:", req.body);

    const { title, description, duration, price } = req.body;

    // Check required fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const newCourse = new Course({
      title,
      description,
      duration,
      price,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('❌ Save error:', err);
    res.status(400).json({ message: 'Invalid course data.', error: err.message });
  }
});

// ✅ DELETE course by ID
router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ message: 'Failed to delete course.' });
  }
});

// ✅ POST /upload (with base64 video)
router.post('/upload', async (req, res) => {
  try {
    const { title, duration, videoBase64, description, price } = req.body;

    if (!title || !duration || !videoBase64) {
      return res.status(400).json({ error: 'All fields (title, duration, videoBase64) are required.' });
    }

    // Estimate size
    const sizeKB = (videoBase64.length * (3 / 4)) / 1024;
    console.log(`📦 Uploading course video (${Math.round(sizeKB)} KB): ${title}`);

    // ✅ Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(videoBase64, {
      resource_type: 'video',
      folder: 'courses',
    });

    const newCourse = new Course({
      title,
      duration,
      videoUrl: uploadRes.secure_url,
      description,
      price,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('❌ Upload error:', err);

    if (err.http_code) {
      return res.status(err.http_code).json({ error: err.message });
    }

    res.status(500).json({ error: 'Upload failed. Please try again.' });
  }
});

export default router;
