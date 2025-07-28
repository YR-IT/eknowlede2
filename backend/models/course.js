import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// ✅ Prevent model overwrite in development (hot reload safe)
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
