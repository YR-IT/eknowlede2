import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    _id: '',
    title: '',
    description: '',
    duration: '',
    price: '',
    video: null as File | null,
    thumbnail: null as File | null,
  });

  const isEditing = !!form._id;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + '/api/courses');
    setCourses(res.data);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadOrUpdate = async () => {
    const { title, duration, description, price, video, thumbnail, _id } = form;

    if (!title || !duration || !video || !thumbnail) {
      return alert('Title, Duration, Video, and Thumbnail are required.');
    }

    const videoBase64 = await toBase64(video);
    const thumbnailBase64 = await toBase64(thumbnail);

    const payload = {
      title,
      duration,
      description,
      price,
      videoBase64,
      thumbnailBase64,
    };

    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/courses/${_id}`, payload);
        alert('Course updated!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/courses/upload`, payload);
        alert('Course uploaded!');
      }

      resetForm();
      fetchCourses();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Something went wrong.');
    }
  };

  const resetForm = () => {
    setForm({
      _id: '',
      title: '',
      description: '',
      duration: '',
      price: '',
      video: null,
      thumbnail: null,
    });
  };

  const handleEdit = (course: any) => {
    setForm({
      _id: course._id,
      title: course.title,
      description: course.description,
      duration: course.duration,
      price: course.price,
      video: null,
      thumbnail: null,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? '✏️ Edit Course' : '📤 Upload New Course'}
      </h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Duration (e.g. 00:46)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <div className="space-y-2">
          <label className="block font-medium">📼 Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setForm({ ...form, video: e.target.files?.[0] || null })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">🖼️ Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, thumbnail: e.target.files?.[0] || null })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleUploadOrUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {isEditing ? 'Update Course' : 'Upload Course'}
          </button>

          {isEditing && (
            <button onClick={resetForm} className="text-gray-500 underline">
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">📚 Existing Courses</h3>
      <ul className="space-y-3">
        {courses.map((course: any) => (
          <li
            key={course._id}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
          >
            <div>
              <strong>{course.title}</strong> ({course.duration}) - ₹{course.price}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleEdit(course)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCourses;
