import { useEffect, useState } from 'react';
import axios from 'axios';

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  tag: string;
  readTime: string;
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get('/api/blogs')
      .then((response) => {
        console.log("✅ Blog data:", response.data);
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('❌ Error fetching blogs:', error);
      });
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      {blogs.length === 0 ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((post) => (
            <div key={post.id} className="bg-white shadow p-4 rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover rounded"
              />
              <h2 className="mt-2 font-semibold text-lg">{post.title}</h2>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
              <p className="text-sm text-gray-500 mt-2">
                By {post.author} · {post.date} · {post.readTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
