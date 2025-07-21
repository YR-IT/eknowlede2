import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js'; // ✅ .js extension required

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://eknowledge.vercel.app'
];

// ✅ CORS
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

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use('/api/blogs', blogRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
