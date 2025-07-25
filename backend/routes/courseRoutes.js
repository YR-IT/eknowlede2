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

// ✅ POST: create course with video & thumbnail
router.post('/upload', async (req, res) => {
  try {
    const { title, duration, videoBase64, thumbnailBase64, description, price } = req.body;

    if (!title || !duration || !videoBase64 || !thumbnailBase64) {
      return res.status(400).json({ error: 'Required fields: title, duration, videoBase64, thumbnailBase64' });
    }

    // ⬆️ Upload video
    const videoUpload = await cloudinary.uploader.upload(videoBase64, {
      resource_type: 'video',
      folder: 'courses/videos',
    });

    // 🖼️ Upload thumbnail
    const thumbnailUpload = await cloudinary.uploader.upload(thumbnailBase64, {
      folder: 'courses/thumbnails',
    });

    // 📦 Save to DB
    const newCourse = new Course({
      title,
      duration,
      videoUrl: videoUpload.secure_url,
      thumbnail: thumbnailUpload.secure_url,
      description,
      price,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Upload failed. Please try again.' });
  }
});

// ✅ POST: create simple course (no video or thumbnail)
router.post('/', async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;

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

// ✅ PUT: update existing course
router.put('/:id', async (req, res) => {
  try {
    const { title, duration, description, price, videoBase64, thumbnailBase64 } = req.body;
    const updates = { title, duration, description, price };

    // ⬆️ Optional: upload new video if provided
    if (videoBase64) {
      const videoUpload = await cloudinary.uploader.upload(videoBase64, {
        resource_type: 'video',
        folder: 'courses/videos',
      });
      updates.videoUrl = videoUpload.secure_url;
    }

    // 🖼️ Optional: upload new thumbnail if provided
    if (thumbnailBase64) {
      const thumbUpload = await cloudinary.uploader.upload(thumbnailBase64, {
        folder: 'courses/thumbnails',
      });
      updates.thumbnail = thumbUpload.secure_url;
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    res.json(updatedCourse);
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ error: 'Failed to update course.' });
  }
});

// ✅ DELETE: delete course by ID
router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ message: 'Failed to delete course.' });
  }
});

export default router;
