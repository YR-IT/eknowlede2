import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS Setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://eknowledge.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Middleware for JSON
app.use(express.json());

// ✅ Multer setup for file uploads
const storage = multer.memoryStorage(); // you can switch to diskStorage if needed
const upload = multer({ storage });

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Upload route (basic test route)
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  console.log('✅ File received:', req.file.originalname);
  res.json({ message: 'Upload successful' });
});

// ✅ Blog routes
app.use('/api/blogs', upload.single('image'), blogRoutes); // if blogRoutes uses image

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
