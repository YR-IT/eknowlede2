// models/Blog.js

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  summary: String,
  content: String,
  image: Buffer, // or image: String (if storing image URLs)
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);
