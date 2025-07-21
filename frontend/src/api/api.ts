// src/api/blogApi.ts
import axios from "axios";

export const getAllBlogs = async () => {
  const response = await axios.get("/api/blogs");
  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await axios.delete(`/api/blogs/${id}`);
  return response.data;
};
