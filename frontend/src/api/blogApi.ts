import axios from "axios";

const BASE_URL = "http://localhost:3001/api/blogs"; // or your deployed URL

export const fetchBlogs = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createBlog = async (blogData: any) => {
  const res = await axios.post(BASE_URL, blogData);
  return res.data;
};

export const updateBlog = async (id: string, blogData: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, blogData);
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
