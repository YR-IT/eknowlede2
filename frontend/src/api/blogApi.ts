import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;



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

  if (blogData.image) {
    formData.append("image", blogData.image); // File object
  }

  const res = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

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
