import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCourses = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [video, setVideo] = useState<File | null>(null);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Converts File to base64
  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // ✅ Upload handler using /api/courses/upload
  const handleUpload = async () => {
    if (!title || !duration || !video) {
      return alert("All fields are required.");
    }

    try {
      const videoBase64 = await toBase64(video);

      const payload = {
        title,
        duration,
        videoBase64,
      };

      await axios.post('http://localhost:3001/api/courses/upload', payload);

      alert('Course uploaded successfully!');
      setTitle('');
      setDuration('');
      setVideo(null);
      fetchCourses();
    } catch (error) {
      console.error('❌ Upload failed:', error);
      alert('Upload failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/courses/${id}`);
      alert('Course deleted!');
      fetchCourses();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload New Course</h2>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Duration (e.g. 00:46)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload Course
        </button>
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-4">Existing Courses</h3>
      <ul className="space-y-3">
        {courses.map((course: any) => (
          <li
            key={course._id}
            className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
          >
            <div>
              <strong>{course.title}</strong>{' '}
              <span className="text-sm text-gray-500">({course.duration})</span>
            </div>
            <button
              onClick={() => handleDelete(course._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCourses;
