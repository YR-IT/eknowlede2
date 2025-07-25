import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import blogRoutes from './routes/blogRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import cloudinary from './utils/cloudinary.js'; // Ensure this is configured properly

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Cloudinary ENV Check
console.log('🌐 Cloudinary ENV:', {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? 'Exists ✅' : 'Missing ❌',
});

// ✅ CORS setup (includes all necessary frontend & backend URLs)
const allowedOrigins = [
  'http://localhost:5173',
  'https://eknowledge.vercel.app',
  'https://eknowledge-mk52.vercel.app',
  'https://eknowledge-mk52.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ CORS rejected origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// ✅ Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/courses', courseRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Backend running!');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
