import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String,
  content: String,
  image: String, // Store Cloudinary image URL
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);
