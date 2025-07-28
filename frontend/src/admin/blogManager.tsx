import React, { useState, useEffect } from 'react';
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  BlogApiData,
  BlogApiResponse
} from '../api/blogApi';

const AdminBlogManager = () => {
  const [blogs, setBlogs] = useState<BlogApiResponse[]>([]);
  const [form, setForm] = useState<BlogApiData>({
    title: '',
    author: 'By Yatish Kumar Goel, Advocate',
    summary: '',
    content: '',
    image: null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all blogs on mount
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const data = await fetchBlogs();
    setBlogs(data);
  };

  // Auto-generate summary
  useEffect(() => {
    if (form.content.length > 20) {
      const generated = form.content.split(' ').slice(0, 25).join(' ') + '...';
      setForm((prev) => ({ ...prev, summary: generated }));
    }
  }, [form.content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, image: e.target.files?.[0] || null });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateBlog(editingId, form);
        alert('Blog updated!');
      } else {
        await createBlog(form);
        alert('Blog published!');
      }
      setForm({
        title: '',
        author: 'By Yatish Kumar Goel, Advocate',
        summary: '',
        content: '',
        image: null,
      });
      setEditingId(null);
      await loadBlogs();
    } catch (err: any) {
      alert(err.message || 'Something went wrong.');
    }
  };

  const handleEdit = (blog: BlogApiResponse) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      author: blog.author,
      summary: blog.summary,
      content: blog.content,
      image: null,
      headerImage: blog.headerImage,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    await deleteBlog(id);
    await loadBlogs();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      title: '',
      author: 'By Yatish Kumar Goel, Advocate',
      summary: '',
      content: '',
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Blog Form */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-bold mb-1">
          {editingId ? '✏️ Edit Blog Post' : '📝 Create New Blog Post'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">Manage your blog content</p>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Enter blog title..."
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="author"
            value={form.author}
            disabled
            className="w-full border p-2 rounded bg-gray-100 text-gray-500"
          />

          <textarea
            name="summary"
            placeholder="Summary auto-generated or type your own..."
            value={form.summary}
            onChange={handleChange}
            className="w-full border p-2 rounded h-20"
          />

          <textarea
            name="content"
            placeholder="Write full blog content here..."
            value={form.content}
            onChange={handleChange}
            className="w-full border p-2 rounded h-40"
          />

          <div>
            <label className="block font-medium mb-1">📷 Upload Header Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {editingId ? 'Update Blog' : 'Publish Blog'}
            </button>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">📚 All Blogs</h3>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs available.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li
                key={blog._id}
                className="bg-white p-4 rounded shadow flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-lg">{blog.title}</h4>
                  <p className="text-sm text-gray-600">{blog.summary}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminBlogManager;
