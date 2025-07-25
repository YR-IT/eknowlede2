import Course from '../models/Course.js';
import cloudinary from '../utils/cloudinary.js';

// Create a new course with Cloudinary video upload
export const createCourse = async (req, res) => {
  try {
    const { title, duration, videoBase64 } = req.body;

    if (!title || !duration || !videoBase64) {
      return res.status(400).json({ message: 'Title, duration and videoBase64 are required' });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_large(videoBase64, {
      resource_type: 'video',
      folder: 'courses',
    });

    const newCourse = new Course({
      title,
      duration,
      videoUrl: uploadResult.secure_url, // ✅ Save the video URL
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('❌ Error uploading course:', error);
    res.status(500).json({ message: 'Error creating course', error });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

// Delete course by ID
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};
