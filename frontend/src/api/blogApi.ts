import axios from "axios";

// ✅ Safe base URL with fallback
const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/blogs`;

export const fetchBlogs = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createBlog = async (blogData: any) => {
  const formData = new FormData();

  formData.append("title", blogData.title);
  formData.append("author", blogData.author);
  formData.append("summary", blogData.summary);
  formData.append("content", blogData.content);

  // ✅ Optional: Add file if it exists
  if (blogData.image) {
    formData.append("image", blogData.image);
  }

  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true // ✅ Optional, if backend uses cookies/sessions
    });

    return res.data;
  } catch (err: any) {
    console.error("❌ Blog upload failed:", err.response?.data || err.message);
    throw err;
  }
};

export const updateBlog = async (id: string, blogData: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, blogData);
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
