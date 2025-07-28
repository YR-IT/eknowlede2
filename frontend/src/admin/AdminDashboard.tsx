import React, { useEffect, useState } from 'react';
import BlogManager from './blogManager';
import CourseManager from './CourseManager';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'courses'>('blogs');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);  

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-2.5 text-sm font-medium border rounded-l-lg focus:outline-none transition ${
              activeTab === 'blogs'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
            }`}
          >
            📝 Manage Blogs
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-2.5 text-sm font-medium border rounded-r-lg focus:outline-none transition ${
              activeTab === 'courses'
                ? 'bg-green-600 text-white'
                : 'bg-white text-green-600 border-green-600 hover:bg-green-50'
            }`}
          >
            🎓 Manage Courses
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {activeTab === 'blogs' ? <BlogManager /> : <CourseManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;
