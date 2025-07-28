import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react'; // Optional: spinner icon

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    _id: '',
    title: '',
    video: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isEditing = !!form._id;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
      setCourses(res.data);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadOrUpdate = async () => {
    const { title, video, _id } = form;

    if (!title || !video) {
      alert('Both title and video are required.');
      return;
    }

    setLoading(true);

    try {
      const videoBase64 = await toBase64(video);
      const payload = { title, videoBase64 };

      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/courses/${_id}`, payload);
        alert('✅ Course updated!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/courses/upload`, payload);
        alert('✅ Course uploaded!');
      }

      resetForm();
      fetchCourses();
    } catch (err: any) {
      console.error('Upload error:', err);
      alert(err?.response?.data?.error || 'Something went wrong during upload.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      _id: '',
      title: '',
      video: null,
    });
  };

  const handleEdit = (course: any) => {
    setForm({
      _id: course._id,
      title: course.title,
      video: null,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    setDeletingId(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('❌ Could not delete course.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? '✏️ Edit Course' : '📤 Upload New Course'}
      </h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
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

        <div className="flex space-x-4">
          <button
            onClick={handleUploadOrUpdate}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </span>
            ) : isEditing ? 'Update Course' : 'Upload Course'}
          </button>

          {isEditing && (
            <button
              onClick={resetForm}
              className="text-gray-500 underline hover:text-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">📚 Uploaded Courses</h3>
      <ul className="space-y-3">
        {courses.map((course: any) => (
          <li
            key={course._id}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
          >
            <div>
              <strong>{course.title}</strong>
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
                disabled={deletingId === course._id}
                className="text-red-600 hover:underline"
              >
                {deletingId === course._id ? (
                  <span className="flex items-center gap-1">
                    <Loader2 className="animate-spin" size={14} />
                    Deleting...
                  </span>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCourses;
