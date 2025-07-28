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

// ✅ POST: upload course (title + video only)
router.post('/upload', async (req, res) => {
  try {
    const { title, videoBase64 } = req.body;

    console.log('📦 Incoming upload:', { title, videoBase64: videoBase64?.slice(0, 30) });

    if (!title || !videoBase64) {
      return res.status(400).json({ error: 'Both title and video are required.' });
    }

    const videoUpload = await cloudinary.uploader.upload(videoBase64, {
      resource_type: 'video',
      folder: 'courses/videos',
    });

    const newCourse = new Course({
      title,
      videoUrl: videoUpload.secure_url,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Upload failed. Please try again.' });
  }
});

// ✅ PUT: update title or video
router.put('/:id', async (req, res) => {
  try {
    const { title, videoBase64 } = req.body;
    const updates = {};

    if (title) updates.title = title;

    if (videoBase64) {
      const videoUpload = await cloudinary.uploader.upload(videoBase64, {
        resource_type: 'video',
        folder: 'courses/videos',
      });
      updates.videoUrl = videoUpload.secure_url;
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

// ✅ DELETE: course by ID
router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully.' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ message: 'Failed to delete course.' });
  }
});

export default router;
