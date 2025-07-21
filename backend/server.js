const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// ✅ Allow local + Vercel frontend domains
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://eknowledge-mk52.onrender.com' // deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cors({
  origin: 'https://eknowledge2.vercel.app',
  credentials: true,
}));


app.use(express.json());

// ✅ Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Online Learning: Trends to Watch in 2024",
    excerpt: "Discover the latest trends shaping the future of online education and how they'll impact learners worldwide.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Sarah Johnson",
    date: "2024-01-15",
    tag: "Technology",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "10 Essential Skills Every Developer Should Master in 2024",
    excerpt: "From AI and machine learning to cloud computing, here are the skills that will define the next generation of developers.",
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Michael Chen",
    date: "2024-01-12",
    tag: "Career",
    readTime: "8 min read",
    featured: true
  }
];

// Test root
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Blog API route
app.get('/api/blogs', (req, res) => {
  res.json(blogPosts);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
