import mongoose from 'mongoose';

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

// ✅ Prevent redefining the model on hot-reload
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
