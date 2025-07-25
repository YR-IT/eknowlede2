import mongoose from 'mongoose';
import Course from 'Course.js'

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  duration: String, // e.g. "00:46"
  videoUrl: String,
  order: Number,
  thumbnail: String, // Optional image URL
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
