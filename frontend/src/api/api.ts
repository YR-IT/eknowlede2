// src/api/api.ts
import axios from "axios";

// ✅ Define full base
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL is missing in .env");
}

// ✅ Fetch all blogs
export const getAllBlogs = async () => {
  const response = await axios.get(BASE_URL); // full URL
  return response.data;
};

// ✅ Delete a blog
export const deleteBlog = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
