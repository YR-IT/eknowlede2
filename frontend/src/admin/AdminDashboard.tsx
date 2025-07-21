import React, { useState, useEffect, useRef } from 'react';
import { Plus, Eye, Edit, Trash2, X, Upload, Save, AlertTriangle } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  author: string;
  summary: string;
  content: string;
  headerImage: string;
  date: string;
}

const AdminDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const savedBlogs = localStorage.getItem('adminDashboardBlogs');
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    content: '',
    headerImage: ''
  });

  // Save blogs to localStorage whenever blogs state changes
  useEffect(() => {
    localStorage.setItem('adminDashboardBlogs', JSON.stringify(blogs));
  }, [blogs]);

  // Auto-generate summary from content
  const generateSummary = (content: string): string => {
    if (!content.trim()) return '';
    
    // Remove HTML tags and clean the text
    const cleanText = content.replace(/<[^>]*>/g, '').trim();
    
    // Split into sentences
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 5);
    
    if (sentences.length === 0) return '';
    
    // Take first 2-3 sentences or up to 200 characters
    let summary = '';
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      const sentence = sentences[i].trim();
      if (summary.length + sentence.length > 200) break;
      summary += (summary ? '. ' : '') + sentence;
    }
    
    return summary + (summary.endsWith('.') ? '' : '.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedFormData = {
        ...prev,
        [name]: value
      };
      
      // Auto-generate summary when content changes
      if (name === 'content') {
        updatedFormData.summary = generateSummary(value);
      }
      
      return updatedFormData;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdt: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          headerImage: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = (isEdit: boolean = false) => {
    if (isEdit) {
      editFileInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleCreateBlog = () => {
    if (formData.title && formData.author && formData.summary && formData.content) {
      const newBlog: Blog = {
        id: Date.now(), // Use timestamp for unique ID
        title: formData.title,
        author: formData.author,
        summary: formData.summary,
        content: formData.content,
        headerImage: formData.headerImage,
        date: new Date().toLocaleDateString('en-GB')
      };
      setBlogs([newBlog, ...blogs]);
      setFormData({ title: '', author: '', summary: '', content: '', headerImage: '' });
      setShowCreateModal(false);
    }
  };

  const handleEditBlog = () => {
    if (editingBlog && formData.title && formData.author && formData.summary && formData.content) {
      const updatedBlogs = blogs.map(blog => 
        blog.id === editingBlog.id 
          ? {
              ...blog,
              title: formData.title,
              author: formData.author,
              summary: formData.summary,
              content: formData.content,
              headerImage: formData.headerImage || blog.headerImage
            }
          : blog
      );
      setBlogs(updatedBlogs);
      setFormData({ title: '', author: '', summary: '', content: '', headerImage: '' });
      setShowEditModal(false);
      setEditingBlog(null);
    }
  };

  const handleDeleteBlog = (id: number) => {
    setDeletingBlogId(id);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteBlog = () => {
    if (deletingBlogId) {
      setBlogs(blogs.filter(blog => blog.id !== deletingBlogId));
      setShowDeleteConfirmModal(false);
      setDeletingBlogId(null);
    }
  };

  const cancelDeleteBlog = () => {
    setShowDeleteConfirmModal(false);
    setDeletingBlogId(null);
  };

  const openPreview = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowPreviewModal(true);
  };

  const openEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      summary: blog.summary,
      content: blog.content,
      headerImage: blog.headerImage
    });
    setShowEditModal(true);
  };

  const openEditFromPreview = () => {
    if (selectedBlog) {
      setShowPreviewModal(false);
      openEdit(selectedBlog);
    }
  };

  const closeAllModals = () => {
    setShowCreateModal(false);
    setShowPreviewModal(false);
    setShowEditModal(false);
    setShowDeleteConfirmModal(false);
    setSelectedBlog(null);
    setEditingBlog(null);
    setDeletingBlogId(null);
    setFormData({ title: '', author: '', summary: '', content: '', headerImage: '' });
  };

  const getBlogToDelete = () => {
    return blogs.find(blog => blog.id === deletingBlogId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
          <div className="space-y-1 sm:space-y-2 flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
              Content Management
            </h1>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg">Create, edit, and manage your Blog with ease</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group w-full lg:w-auto text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Blog Post</span>
          </button>
        </div>

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-16 sm:py-20 lg:py-24">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">No Blog Posts Yet</h3>
              <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">Get started by creating your first blog post to share your insights with the world.</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group mx-auto text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Create Your First Blog Post</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {blogs.map((blog, index) => (
              <div key={blog.id} className={`bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 transform hover:-translate-y-1 sm:hover:-translate-y-2 ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}>
                <div className="flex flex-col lg:flex-row">
                  {/* Content */}
                  <div className="flex-1 p-4 sm:p-5 lg:p-6">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 px-2 sm:px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="truncate max-w-[120px] sm:max-w-none">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 px-2 sm:px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {blog.date}
                      </div>
                    </div>
                    
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight hover:text-blue-700 transition-colors duration-300 cursor-pointer line-clamp-2">
                      {blog.title}
                    </h2>
                    
                    <p className="text-slate-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base line-clamp-2">
                      {blog.summary}
                    </p>
                    
                    {/* Show more content preview */}
                    <div className="text-slate-500 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                      {blog.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
                    </div>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <button
                        onClick={() => openPreview(blog)}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-blue-600 hover:text-white hover:bg-blue-600 border-2 border-blue-600 rounded-lg transition-all duration-300 font-medium transform hover:scale-105 text-xs sm:text-sm"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => openEdit(blog)}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-amber-600 hover:text-white hover:bg-amber-600 border-2 border-amber-600 rounded-lg transition-all duration-300 font-medium transform hover:scale-105 text-xs sm:text-sm"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-600 rounded-lg transition-all duration-300 font-medium transform hover:scale-105 text-xs sm:text-sm"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {/* Smaller Header Image */}
                  <div className="w-full lg:w-64 xl:w-72 h-40 sm:h-48 lg:h-auto relative overflow-hidden group">
                    <img
                      src={blog.headerImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full transform animate-scale-in">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Delete Blog Post</h3>
                    <p className="text-slate-600 text-sm sm:text-base">This action cannot be undone</p>
                  </div>
                </div>
                
                <div className="mb-6 sm:mb-8">
                  <p className="text-slate-700 mb-3 sm:mb-4 text-sm sm:text-base">
                    Are you sure you want to delete this blog post?
                  </p>
                  {getBlogToDelete() && (
                    <div className="bg-slate-50 p-3 sm:p-4 rounded-lg border-l-4 border-red-500">
                      <p className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-2">
                        "{getBlogToDelete()?.title}"
                      </p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1">
                        by {getBlogToDelete()?.author}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={cancelDeleteBlog}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-semibold text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteBlog}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Blog Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto transform animate-scale-in">
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                      Create New Blog Post
                    </h2>
                    <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">Share your insights with the world</p>
                  </div>
                  <button
                    onClick={closeAllModals}
                    className="p-2 sm:p-3 hover:bg-slate-100 rounded-xl transition-colors duration-200 group"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500 group-hover:text-slate-700 group-hover:rotate-90 transition-all duration-300" />
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a compelling title for your blog..."
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="By Yatish Kumar Goel, Advocate"
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Summary</label>
                    <p className="text-xs sm:text-sm text-blue-600 bg-blue-50 p-2 sm:p-3 rounded-lg border-l-4 border-blue-500">
                      ✨ <strong>Auto-generated:</strong> The summary will be automatically created from your blog content as you type!
                    </p>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Summary will be auto-generated from your content, or you can write your own..."
                      rows={4}
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 resize-none text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Header Image</label>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <input
                        type="text"
                        name="headerImage"
                        value={formData.headerImage}
                        onChange={handleInputChange}
                        placeholder="Enter image URL or upload image"
                        className="flex-1 p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleImageUpload(e, false)}
                        accept="image/*"
                        className="hidden"
                      />
                      <button 
                        type="button"
                        onClick={() => triggerImageUpload(false)}
                        className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg font-medium group"
                      >
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-blue-600 transition-colors duration-300" />
                        Upload Image
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Content</label>
                    <p className="text-xs sm:text-sm text-slate-500 bg-slate-50 p-2 sm:p-3 rounded-lg border-l-4 border-blue-500">
                      💡 <strong>Pro tip:</strong> You can use HTML formatting like &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;blockquote&gt;, etc.
                    </p>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write your full blog content here..."
                      rows={10}
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 resize-none text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-slate-200">
                    <button
                      onClick={closeAllModals}
                      className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateBlog}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base lg:text-lg"
                    >
                      <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                      Upload Blog Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Blog Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto transform animate-scale-in">
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-amber-900 bg-clip-text text-transparent">
                      Edit Blog Post
                    </h2>
                    <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">Update and refine your content</p>
                  </div>
                  <button
                    onClick={closeAllModals}
                    className="p-2 sm:p-3 hover:bg-slate-100 rounded-xl transition-colors duration-200 group"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500 group-hover:text-slate-700 group-hover:rotate-90 transition-all duration-300" />
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a compelling title for your blog..."
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="By Yatish Kumar Goel, Advocate"
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Summary</label>
                    <p className="text-xs sm:text-sm text-blue-600 bg-blue-50 p-2 sm:p-3 rounded-lg border-l-4 border-blue-500">
                      ✨ <strong>Auto-generated:</strong> The summary will be automatically created from your blog content as you type!
                    </p>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Summary will be auto-generated from your content, or you can write your own..."
                      rows={4}
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300 resize-none text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Header Image</label>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <input
                        type="text"
                        name="headerImage"
                        value={formData.headerImage}
                        onChange={handleInputChange}
                        placeholder="Enter image URL or upload image"
                        className="flex-1 p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                      />
                      <input
                        type="file"
                        ref={editFileInputRef}
                        onChange={(e) => handleImageUpload(e, true)}
                        accept="image/*"
                        className="hidden"
                      />
                      <button 
                        type="button"
                        onClick={() => triggerImageUpload(true)}
                        className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg font-medium group"
                      >
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-amber-600 transition-colors duration-300" />
                        Upload Image
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Content</label>
                    <p className="text-xs sm:text-sm text-slate-500 bg-slate-50 p-2 sm:p-3 rounded-lg border-l-4 border-amber-500">
                      💡 <strong>Pro tip:</strong> You can use HTML formatting like &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;blockquote&gt;, etc.
                    </p>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write your full blog content here..."
                      rows={10}
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300 resize-none text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-slate-200">
                    <button
                      onClick={closeAllModals}
                      className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditBlog}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base lg:text-lg"
                    >
                      <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                      Update Blog Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && selectedBlog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto transform animate-scale-in">
              <div className="relative">
                <div className="h-48 sm:h-64 lg:h-80 relative overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                  <img
                    src={selectedBlog.headerImage}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <button
                    onClick={closeAllModals}
                    className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 sm:p-3 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl transition-all duration-200 group shadow-lg"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 px-3 sm:px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-slate-700 truncate max-w-[120px] sm:max-w-none">{selectedBlog.author}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-3 sm:px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-slate-700">{selectedBlog.date}</span>
                  </div>
                </div>
                
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
                  {selectedBlog.title}
                </h1>
                
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 border-l-4 border-blue-500">
                  <h3 className="font-bold text-slate-800 mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Executive Summary
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {selectedBlog.summary}
                  </p>
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="font-bold text-slate-800 mb-4 sm:mb-6 text-base sm:text-lg lg:text-xl flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Full Content
                  </h3>
                  <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base lg:text-lg bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm">
                    {selectedBlog.content}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-slate-200 mt-8 sm:mt-12">
                  <button
                    onClick={openEditFromPreview}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base lg:text-lg"
                  >
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                    Edit Blog Post
                  </button>
                  <button
                    onClick={closeAllModals}
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
