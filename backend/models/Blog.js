import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    headerImage: {
      type: String,
      default: 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image',
    },
    date: {
      type: String, // Format: DD/MM/YYYY (provided from frontend)
      default: () => new Date().toLocaleDateString('en-GB'),
    },
    createdAt: {
      type: Number, // UNIX timestamp (custom numeric value from frontend)
      default: () => Date.now(),
    },
  },
  {
    timestamps: true, // Mongoose will also store createdAt & updatedAt as Date types
  }
);

export default mongoose.model('Blog', blogSchema);