import React, { useState, useEffect } from 'react';
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  BlogApiData,
  BlogApiResponse
} from '../api/blogApi';
import { Loader2 } from 'lucide-react';

const AdminBlogManager = () => {
  const [blogs, setBlogs] = useState<BlogApiResponse[]>([]);
  const [form, setForm] = useState<BlogApiData>({
    title: '',
    author: 'Yatish Kumar Goel, Advocate',
    summary: '',
    content: '',
    image: null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewBlog, setPreviewBlog] = useState<BlogApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    const data = await fetchBlogs();
    setBlogs(data);
  };

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
    setLoading(true);
    try {
      if (editingId) {
        await updateBlog(editingId, form);
        alert('Blog updated!');
      } else {
        await createBlog(form);
        alert('Blog published!');
      }
      resetForm();
      await loadBlogs();
    } catch (err: any) {
      alert(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
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
    setDeletingId(id);
    try {
      await deleteBlog(id);
      await loadBlogs();
    } catch (err) {
      alert('Delete failed.');
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      author: 'Yatish Kumar Goel, Advocate',
      summary: '',
      content: '',
      image: null,
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
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
              disabled={loading}
              className={`w-full py-2 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} /> Processing...
                </span>
              ) : editingId ? 'Update Blog' : 'Publish Blog'}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Preview Modal with Header Image */}
      {previewBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setPreviewBlog(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>

            {previewBlog.headerImage && (
              <img
                src={previewBlog.headerImage}
                alt="Header"
                className="rounded-md w-full h-60 object-cover mb-4"
              />
            )}

            <h2 className="text-2xl font-bold mb-2">{previewBlog.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              By {previewBlog.author} | {new Date(previewBlog.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700 whitespace-pre-wrap">{previewBlog.content}</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">📚 All Blogs</h3>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs available.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li
                key={blog._id}
                className="bg-white p-4 rounded shadow flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="font-bold text-lg">{blog.title}</h4>
                  <p className="text-sm text-gray-600">{blog.summary}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Published: {new Date(blog.createdAt).toLocaleDateString()}{' '}
                    {new Date(blog.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPreviewBlog(blog)}
                    className="text-green-600 hover:underline"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-600 hover:underline"
                    disabled={deletingId === blog._id}
                  >
                    {deletingId === blog._id ? (
                      <span className="flex items-center gap-1">
                        <Loader2 className="animate-spin" size={14} /> Deleting...
                      </span>
                    ) : (
                      'Delete'
                    )}
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
