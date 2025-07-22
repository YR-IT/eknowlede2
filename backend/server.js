import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js'; // ✅ Already correct!

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Check environment
console.log('🌐 Cloudinary ENV:', {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET ? 'Exists ✅' : 'Missing ❌'
});

// ✅ CORS Setup
const allowedOrigins = ['http://localhost:5173', 'https://eknowledge.vercel.app'];
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

// ✅ JSON parsing
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use('/api/blogs', blogRoutes);

// ✅ Health Check
app.get("/", (req, res) => res.send("Backend running ✅"));

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));