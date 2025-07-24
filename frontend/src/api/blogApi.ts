import axios from "axios";

// 🔧 Base API URL (supports both local & Vercel)
const API_ROOT = import.meta.env.VITE_API_URL || "http://localhost:3001";
const BASE_URL = `${API_ROOT.replace(/\/$/, "")}/api/blogs`;


if (import.meta.env.DEV) {
  console.log("👉 API Base URL (DEV):", BASE_URL); // Remove or silence in prod
}

// ✅ Interfaces
export interface BlogApiData {
  title: string;
  author: string;
  summary: string;
  content: string;
  image?: File | null;
  headerImage?: string;
  date?: string;
  createdAt?: number;
}

export interface BlogApiResponse {
  _id: string;
  title: string;
  author: string;
  summary: string;
  content: string;
  headerImage: string;
  date: string;
  createdAt: number;
  updatedAt: string;
}

// ✅ Fetch all blogs
export const fetchBlogs = async (): Promise<BlogApiResponse[]> => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err: any) {
    console.error("❌ Error fetching blogs:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to fetch blogs");
  }
};

// ✅ Create blog
export const createBlog = async (blogData: BlogApiData): Promise<BlogApiResponse> => {
  const formData = new FormData();
  formData.append("title", blogData.title);
  formData.append("author", blogData.author);
  formData.append("summary", blogData.summary);
  formData.append("content", blogData.content);
  formData.append("date", blogData.date || new Date().toLocaleDateString("en-GB"));
  formData.append("createdAt", (blogData.createdAt ?? Date.now()).toString());

  if (blogData.image) {
    formData.append("image", blogData.image);
  } else if (blogData.headerImage) {
    formData.append("headerImage", blogData.headerImage);
  }

  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.blog;
  } catch (err: any) {
    console.error("❌ Blog creation failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to create blog");
  }
};

// ✅ Update blog
export const updateBlog = async (id: string, blogData: BlogApiData): Promise<BlogApiResponse> => {
  const formData = new FormData();
  formData.append("title", blogData.title);
  formData.append("author", blogData.author);
  formData.append("summary", blogData.summary);
  formData.append("content", blogData.content);

  if (blogData.image) {
    formData.append("image", blogData.image);
  } else if (blogData.headerImage !== undefined) {
    formData.append("headerImage", blogData.headerImage);
  }

  try {
    const res = await axios.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.blog;
  } catch (err: any) {
    console.error("❌ Blog update failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to update blog");
  }
};

// ✅ Delete blog
export const deleteBlog = async (id: string): Promise<{ message: string; id: string }> => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err: any) {
    console.error("❌ Blog deletion failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to delete blog");
  }
};
