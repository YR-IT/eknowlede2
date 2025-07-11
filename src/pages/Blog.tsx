import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const tags = ['All', 'Technology', 'Career', 'Learning Tips', 'Industry News', 'Success Stories'];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Online Learning: Trends to Watch in 2024",
      excerpt: "Discover the latest trends shaping the future of online education and how they'll impact learners worldwide.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Sarah Johnson",
      date: "2024-01-15",
      tag: "Technology",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "10 Essential Skills Every Developer Should Master in 2024",
      excerpt: "From AI and machine learning to cloud computing, here are the skills that will define the next generation of developers.",
      image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Michael Chen",
      date: "2024-01-12",
      tag: "Career",
      readTime: "8 min read",
      featured: true
    },
    {
      id: 3,
      title: "How to Stay Motivated During Your Learning Journey",
      excerpt: "Practical tips and strategies to maintain motivation and momentum throughout your educational journey.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      tag: "Learning Tips",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Data Science Revolution: What's New in 2024",
      excerpt: "Explore the latest developments in data science and how they're transforming industries worldwide.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Dr. James Wilson",
      date: "2024-01-08",
      tag: "Industry News",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "From Zero to Hero: A Student's Journey to Landing Their Dream Job",
      excerpt: "Follow Maria's inspiring journey from complete beginner to landing a senior developer position at a Fortune 500 company.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Lisa Thompson",
      date: "2024-01-05",
      tag: "Success Stories",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "The Art of Continuous Learning in Tech",
      excerpt: "Why continuous learning is crucial in the tech industry and how to build effective learning habits.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "David Park",
      date: "2024-01-03",
      tag: "Learning Tips",
      readTime: "5 min read"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag === 'All' || post.tag === selectedTag;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section className="bg-gray-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-6 rounded-xl mb-16 shadow-md">
          <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-200 via-transparent to-transparent"></div>
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4"
            >
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Blog</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            >
              Dive into industry insights, learning tips, and inspiring stories curated just for you.
            </motion.p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <Tag className="h-4 w-4" />
                <span>{tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedTag === 'All' && !searchTerm && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-indigo-600 font-medium">{featuredPost.tag}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <span className="text-gray-500">{featuredPost.readTime}</span>
                  </div>
                  <button className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
                <div className="relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <button className="group text-indigo-600 hover:text-purple-600 font-medium flex items-center space-x-1 transition-colors duration-300">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
