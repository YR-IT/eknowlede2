import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import blogRoutes from './routes/blogRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import cloudinary from './utils/cloudinary.js'; // Cloudinary config

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Cloudinary ENV Check (for debug)
console.log('🌐 Cloudinary ENV:', {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? 'Exists ✅' : 'Missing ❌'
});

// ✅ CORS setup: allow local & deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://eknowledge.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Middleware: handle large payloads (for video)
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// ✅ Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/courses', courseRoutes);

// ✅ Health check
app.get('/', (req, res) => res.send('✅ Backend running!'));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
