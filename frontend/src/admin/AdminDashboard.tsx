import React, { useState } from "react";
import axios from "axios";

const AdminDashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Yatish Kumar Goel, Advocate");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("summary", summary);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/blogs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setSuccessMessage("✅ Blog post uploaded successfully!");
      setTitle("");
      setAuthor("Yatish Kumar Goel, Advocate");
      setSummary("");
      setContent("");
      setImage(null);
    } catch (error: any) {
      console.error("Error uploading blog:", error);
      setErrorMessage(
        error.response?.data?.message || "❌ Upload failed. Check backend logs."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-2xl px-6 py-8 bg-white rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 Create New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter a compelling title for your blog..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Blog Summary
            </label>
            <textarea
              placeholder="Summary will be auto-generated from your content, or you can write your own..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Header Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-100 hover:file:bg-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Blog Content
            </label>
            <textarea
              placeholder="Write your full blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">
              💡 You can use HTML formatting like <code>&lt;h2&gt;</code>,{" "}
              <code>&lt;p&gt;</code>, <code>&lt;ul&gt;</code>, etc.
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setAuthor("Yatish Kumar Goel, Advocate");
                setSummary("");
                setContent("");
                setImage(null);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Uploading..." : "Upload Blog Post"}
            </button>
          </div>
        </form>

        {successMessage && (
          <p className="mt-4 text-green-600 font-semibold text-center">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-600 font-semibold text-center">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
