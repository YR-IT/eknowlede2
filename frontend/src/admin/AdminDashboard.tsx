import React, { useState, useEffect, useRef } from 'react';
import { Plus, Eye, Edit, Trash2, X, Upload, Save, AlertTriangle, Loader2 } from 'lucide-react';
import * as blogApi from "../api/blogApi";



// Define the Blog interface
interface Blog {
  _id: string; // MongoDB document _id will be a string
  title: string;
  author: string;
  summary: string;
  content: string;
  headerImage: string; // This will store the Cloudinary URL
  date: string;
  createdAt: number; // Timestamp for sorting
}

const fetchBlogs = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
    const data = await response.json();
    setBlogs(data);
  } catch (err) {
    console.error("❌ Failed to fetch blogs:", err);
  }
};




const AdminDashboard: React.FC = () => {
  // State variables for managing blogs and UI modals
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null); // Blog currently being previewed
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null); // Blog currently being edited
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null); // ID of blog to be deleted

  // Refs for file input elements
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for create modal image upload
  const editFileInputRef = useRef<HTMLInputElement>(null); // Ref for edit modal image upload

  // Form data state for create/edit operations (using individual states for clarity as per user's example)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [headerImagePreview, setHeaderImagePreview] = useState(''); // For displaying image preview (Data URL)
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null); // For storing the actual file to upload

  // Loading, success, and error states for API operations
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- Function to fetch blogs from backend API ---
  const fetchBlogs = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const fetchedBlogs = await blogApi.fetchBlogs();
      // Assuming backend returns an array of blog objects with '_id'
      // No need to map _id to id here if backend already returns _id
      // Sorting is done in the backend, but keeping client-side sort as fallback
      fetchedBlogs.sort((a, b) => b.createdAt - a.createdAt);
      setBlogs(fetchedBlogs);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      // Provide a more user-friendly error message
      setErrorMessage(`Failed to load blog posts. Please ensure the backend server is running and accessible. Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };
  // Fetch blogs on component mount
  useEffect(() => {
    console.log("👉 Full URL:", `${import.meta.env.VITE_API_URL}/api/blogs`);
    fetchBlogs();
  }, []); // Empty dependency array means this runs once on mount

  
  const generateSummary = (text: string): string => {
    if (!text.trim()) return '';

    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 5);

    if (sentences.length === 0) return '';

    let summaryText = '';
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      const sentence = sentences[i].trim();
      if (summaryText.length + sentence.length > 200) break;
      summaryText += (summaryText ? '. ' : '') + sentence;
    }

    return summaryText + (summaryText.endsWith('.') ? '' : '.');
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    else if (name === 'author') setAuthor(value);
    else if (name === 'summary') setSummary(value); // Allow manual summary override
    else if (name === 'content') {
      setContent(value);
      setSummary(generateSummary(value)); // Auto-generate summary
    }
  };

  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeaderImageFile(file); // Store the file
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setHeaderImagePreview(imageUrl); // Set Data URL for preview
      };
      reader.readAsDataURL(file);
    } else {
      setHeaderImageFile(null);
      setHeaderImagePreview('');
    }
  };

 
  const triggerImageUpload = (isEdit: boolean = false) => {
    if (isEdit) {
      editFileInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  
  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setSummary('');
    setContent('');
    setHeaderImagePreview('');
    setHeaderImageFile(null);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  
  const handleCreateBlog = async () => {
    if (!title || !author || !summary || !content) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await blogApi.createBlog({
        title,
        author,
        summary,
        content,
        image: headerImageFile, // Pass the File object
        headerImage: headerImagePreview // Pass preview URL for placeholder if no file
      });

      setSuccessMessage("✅ Blog post uploaded successfully!");
      resetForm(); // Reset form fields
      setShowCreateModal(false); // Close modal
      fetchBlogs(); // Re-fetch all blogs to update the list
    } catch (err: any) {
      console.error("Error creating blog:", err);
      setErrorMessage(`❌ Upload failed: ${err.response?.data?.message || err.message}. Please check your backend server and network connection.`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the editing of an existing blog post by sending data to the backend API.
   */
  const handleEditBlog = async () => {
    if (!editingBlog || !title || !author || !summary || !content) {
      setErrorMessage("Please fill in all required fields for editing.");
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await blogApi.updateBlog(editingBlog._id, { // Use _id for update
        title,
        author,
        summary,
        content,
        image: headerImageFile, // Pass the new File object if selected
        headerImage: headerImagePreview // Pass the current preview URL (can be existing Cloudinary URL or cleared)
      });

      setSuccessMessage("✅ Blog post updated successfully!");
      resetForm(); // Reset form fields
      setShowEditModal(false); // Close modal
      setEditingBlog(null); // Clear editing blog
      fetchBlogs(); // Re-fetch all blogs to update the list
    } catch (err: any) {
      console.error("Error updating blog:", err);
      setErrorMessage(`❌ Update failed: ${err.response?.data?.message || err.message}. Please check your backend server and network connection.`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initiates the delete confirmation process for a blog post.
   * @param id The ID of the blog post to be deleted.
   */
  const handleDeleteBlog = (id: string) => {
    console.log("Attempting to delete blog with ID:", id); // Log the ID being sent
    setDeletingBlogId(id);
    setShowDeleteConfirmModal(true);
  };

  /**
   * Confirms and performs the deletion of a blog post via the backend API.
   */
  const confirmDeleteBlog = async () => {
    if (!deletingBlogId) {
      setErrorMessage("No blog selected for deletion.");
      return;
    }

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await blogApi.deleteBlog(deletingBlogId);

      setSuccessMessage("✅ Blog post deleted successfully!");
      setShowDeleteConfirmModal(false); // Close modal
      setDeletingBlogId(null); // Clear deleting blog ID
      fetchBlogs(); // Re-fetch all blogs to update the list
    } catch (err: any) {
      console.error("Error deleting blog:", err);
      setErrorMessage(`❌ Deletion failed: ${err.response?.data?.message || err.message}. Please check your backend server and network connection.`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancels the delete operation.
   */
  const cancelDeleteBlog = () => {
    setShowDeleteConfirmModal(false);
    setDeletingBlogId(null);
    setErrorMessage(null); // Clear error on cancel
  };

  /**
   * Opens the preview modal for a specific blog.
   * @param blog The blog object to be previewed.
   */
  const openPreview = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowPreviewModal(true);
  };

  /**
   * Opens the edit modal for a specific blog, populating the form with its data.
   * @param blog The blog object to be edited.
   */
  const openEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setAuthor(blog.author);
    setSummary(blog.summary);
    setContent(blog.content);
    setHeaderImagePreview(blog.headerImage); // Set current image for preview
    setHeaderImageFile(null); // Clear any pending file selection
    setShowEditModal(true);
  };

  /**
   * Switches from the preview modal to the edit modal for the currently selected blog.
   */
  const openEditFromPreview = () => {
    if (selectedBlog) {
      setShowPreviewModal(false); // Close preview modal
      openEdit(selectedBlog); // Open edit modal with the same blog
    }
  };

  /**
   * Closes all modals and resets relevant state variables.
   */
  const closeAllModals = () => {
    setShowCreateModal(false);
    setShowPreviewModal(false);
    setShowEditModal(false);
    setShowDeleteConfirmModal(false);
    setSelectedBlog(null);
    setEditingBlog(null);
    setDeletingBlogId(null);
    resetForm(); // Reset all form fields and messages
  };

  /**
   * Helper function to get the blog object that is currently targeted for deletion.
   * @returns The blog object or null if not found.
   */
  const getBlogToDelete = () => {
    return blogs.find(blog => blog._id === deletingBlogId); // Use _id for comparison
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden font-sans">
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
            onClick={() => { setShowCreateModal(true); resetForm(); }} // Reset form when opening create modal
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group w-full lg:w-auto text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Blog Post</span>
          </button>
        </div>

        {/* Loading and Error Indicators */}
        {loading && (
          <div className="flex items-center justify-center py-12 text-blue-600">
            <Loader2 className="w-8 h-8 animate-spin mr-3" />
            <p className="text-lg font-medium">Loading blog posts...</p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{errorMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <X className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => setErrorMessage(null)} />
            </span>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative mb-6" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline ml-2">{successMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <X className="h-6 w-6 text-green-500 cursor-pointer" onClick={() => setSuccessMessage(null)} />
            </span>
          </div>
        )}

        {/* Blogs Grid */}
        {!loading && !errorMessage && blogs.length === 0 ? (
          <div className="text-center py-16 sm:py-20 lg:py-24">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">No Blog Posts Yet</h3>
              <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">Get started by creating your first blog post to share your insights with the world.</p>
              <button
                onClick={() => { setShowCreateModal(true); resetForm(); }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group mx-auto text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Create Your First Blog Post</span>
              </button>
            </div>
          </div>
        ) : (
          !loading && !errorMessage && (
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {blogs.map((blog, index) => (
                
                <div key={blog._id} className={`bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 transform hover:-translate-y-1 sm:hover:-translate-y-2 ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}>
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
                          onClick={() => handleDeleteBlog(blog._id)} // Pass _id for deletion
                          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-600 rounded-lg transition-all duration-300 font-medium transform hover:scale-105 text-xs sm:text-sm"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Smaller Header Image */}
                    <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-lg">
  <img
  
    src={blog.headerImage || 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image'}
    alt={blog.title}
    className="w-full h-48 object-cover"
    onError={(e) => {
      e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Image+Error';
    }}
  />
  <div className="p-4">
    <h2 className="text-lg font-semibold">{blog.title}</h2>
    <p className="text-sm text-gray-600">{blog.summary}</p>
  </div>
</div>

                  </div>
                </div>
              ))}
            </div>
          )
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
                    <label htmlFor="create-title" className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Title</label>
                    <input
                      id="create-title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={handleInputChange}
                      placeholder="Enter a compelling title for your blog..."
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="create-author" className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Author</label>
                    <input
                      id="create-author"
                      type="text"
                      name="author"
                      value={author}
                      onChange={handleInputChange}
                      placeholder="By Yatish Kumar Goel, Advocate"
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="create-summary" className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Summary</label>
                    <p className="text-xs sm:text-sm text-blue-600 bg-blue-50 p-2 sm:p-3 rounded-lg border-l-4 border-blue-500">
                      ✨ <strong>Auto-generated:</strong> The summary will be automatically created from your blog content as you type!
                    </p>
                    <textarea
                      id="create-summary"
                      name="summary"
                      value={summary}
                      onChange={handleInputChange}
                      placeholder="Summary will be auto-generated from your content, or you can write your own..."
                      rows={4}
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-300 resize-none text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Header Image</label>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
                      {headerImagePreview && (
                        <div className="w-32 h-24 sm:w-40 sm:h-28 rounded-lg overflow-hidden border-2 border-slate-200 shadow-sm flex-shrink-0">
                          <img
                            src={headerImagePreview}
                            alt="Header Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/160x112/e2e8f0/64748b?text=Image+Error'; }}
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => triggerImageUpload(false)}
                        className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg font-medium group"
                      >
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-blue-600 transition-colors duration-300" />
                        {headerImagePreview ? 'Change Image' : 'Upload Image'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="create-content" className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Content</label>
                    <p className="text-xs sm:text-sm text-slate-500 bg-slate-50 p-2 sm:p-3 rounded-lg border-l-4 border-blue-500">
                      💡 <strong>Pro tip:</strong> You can use HTML formatting like &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;blockquote&gt;, etc.
                    </p>
                    <textarea
                      id="create-content"
                      name="content"
                      value={content}
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
                    <label htmlFor="edit-title" className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Title</label>
                    <input
                      id="edit-title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={handleInputChange}
                      placeholder="Enter a compelling title for your blog..."
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-author" className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Author</label>
                    <input
                      id="edit-author"
                      type="text"
                      name="author"
                      value={author}
                      onChange={handleInputChange}
                      placeholder="By Yatish Kumar Goel, Advocate"
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300 text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-summary" className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Summary</label>
                    <p className="text-xs sm:text-sm text-blue-600 bg-blue-50 p-2 sm:p-3 rounded-lg border-l-4 border-blue-500">
                      ✨ <strong>Auto-generated:</strong> The summary will be automatically created from your blog content as you type!
                    </p>
                    <textarea
                      id="edit-summary"
                      name="summary"
                      value={summary}
                      onChange={handleInputChange}
                      placeholder="Summary will be auto-generated from your content, or you can write your own..."
                      rows={4}
                      className="w-full p-3 sm:p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300 resize-none text-sm sm:text-base lg:text-lg hover:border-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Header Image</label>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
                      {headerImagePreview && (
                        <div className="w-32 h-24 sm:w-40 sm:h-28 rounded-lg overflow-hidden border-2 border-slate-200 shadow-sm flex-shrink-0">
                          <img
                            src={headerImagePreview}
                            alt="Header Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/160x112/e2e8f0/64748b?text=Image+Error'; }}
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        ref={editFileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => triggerImageUpload(true)}
                        className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg font-medium group"
                      >
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-amber-600 transition-colors duration-300" />
                        {headerImagePreview ? 'Change Image' : 'Upload Image'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="edit-content" className="block text-slate-800 font-semibold text-sm sm:text-base lg:text-lg">Blog Content</label>
                    <p className="text-xs sm:text-sm text-slate-500 bg-slate-50 p-2 sm:p-3 rounded-lg border-l-4 border-amber-500">
                      💡 <strong>Pro tip:</strong> You can use HTML formatting like &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;blockquote&gt;, etc.
                    </p>
                    <textarea
                      id="edit-content"
                      name="content"
                      value={content}
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

        {/* Preview Blog Modal */}
        {showPreviewModal && selectedBlog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto transform animate-scale-in">
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                      Blog Post Preview
                    </h2>
                    <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">See how your blog post will appear</p>
                  </div>
                  <button
                    onClick={closeAllModals}
                    className="p-2 sm:p-3 hover:bg-slate-100 rounded-xl transition-colors duration-200 group"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500 group-hover:text-slate-700 group-hover:rotate-90 transition-all duration-300" />
                  </button>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {selectedBlog.headerImage && (
                    <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={selectedBlog.headerImage}
                        alt={selectedBlog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/e2e8f0/64748b?text=Image+Error'; }}
                      />
                    </div>
                  )}

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    {selectedBlog.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-slate-600">
                    <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">{selectedBlog.author}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{selectedBlog.date}</span>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed text-base sm:text-lg italic border-l-4 border-blue-400 pl-4 py-1">
                    {selectedBlog.summary}
                  </p>

                  <div
                    className="prose prose-lg max-w-none text-slate-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                  />

                  <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-slate-200">
                    <button
                      onClick={closeAllModals}
                      className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg"
                    >
                      Close Preview
                    </button>
                    <button
                      onClick={openEditFromPreview}
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base lg:text-lg"
                    >
                      <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                      Edit Post
                    </button>
                  </div>
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

function setBlogs(data: any) {
  throw new Error('Function not implemented.');
}
