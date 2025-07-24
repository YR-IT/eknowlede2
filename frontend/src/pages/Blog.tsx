import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BookOpen, Calendar, ArrowRight, Sparkles, Star,
  Dot
} from 'lucide-react';


import { fetchBlogs } from "../api/blogApi"; // Adjust path accordingly

useEffect(() => {
  fetchBlogs()
    .then(setBlogs)
    .catch(err => console.error("❌ Error fetching blogs:", err))
    .finally(() => setLoading(false));
}, []);


type Blog = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  createdAt: string;
  headerImage: string;
};

const API_BASE = import.meta.env.VITE_API_URL;

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Blog | null>(null);
  const [currentView, setCurrentView] = useState<'blog' | 'article'>('blog');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error("❌ Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  const openArticle = (article: Blog) => {
    setSelectedArticle(article);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToBlog = () => {
    setSelectedArticle(null);
    setCurrentView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToArticles = () => {
    const section = document.getElementById('articles-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentView === 'article' && selectedArticle) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-pink-50 border-b border-pink-100 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button onClick={backToBlog} className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium">
                <ArrowRight className="w-5 h-5 rotate-180" /> Back to Blog
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-6">{selectedArticle.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
              <p className="font-semibold text-slate-800">By {selectedArticle.author}</p>
              <Dot className="w-4 h-4 text-gray-400" />
              <span className="font-bold">{new Date(selectedArticle.createdAt).toLocaleDateString()}</span>
            </div>
            <img src={selectedArticle.headerImage} alt={selectedArticle.title} className="w-full h-96 object-cover rounded-2xl mb-12 shadow-lg" />
          </div>

          <article className="prose prose-xl max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />

          <div className="mt-16 pt-8 border-t border-gray-200">
            <button onClick={backToBlog} className="flex items-center gap-2 bg-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105">
              <ArrowRight className="w-5 h-5 rotate-180" /> Back to All Articles
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white text-pink-700 px-6 py-3 rounded-full font-semibold mb-8">
            <BookOpen className="w-5 h-5" /> Latest News & Insights <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-6xl font-bold mb-6"><span className="text-pink-200">Blogs</span></h1>
          <p className="text-2xl text-pink-100 mb-16">Expert legal insights, case studies, and industry analysis to keep you informed</p>
          <button onClick={scrollToArticles} className="bg-white text-pink-700 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 text-lg">Browse All Articles</button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-700 text-white px-6 py-3 rounded-full font-semibold">
          <Star className="w-5 h-5 text-pink-200" /> Featured Articles
        </div>
      </div>

      <section id="articles-section" className="max-w-7xl mx-auto px-4 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-4"><span className="text-pink-600">Featured Articles</span></h2>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">Loading articles...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-slate-500">No blog posts found.</p>
        ) : (
          <div className="space-y-8">
            {blogs.map((article) => (
              <article key={article._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
                <div className="lg:flex">
                  <div className="lg:w-2/5 overflow-hidden">
                    <img src={article.headerImage} alt={article.title} className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-4 line-clamp-3 group-hover:text-blue-600 transition-colors">{article.title}</h3>
                      <p className="text-slate-600 text-lg mb-4 line-clamp-2">{article.summary}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <p className="font-semibold text-slate-800">By {article.author}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1"><Dot className="w-4 h-4 text-gray-400" /><strong>{new Date(article.createdAt).toLocaleDateString()}</strong></p>
                      </div>
                      <button onClick={() => openArticle(article)} className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105">
                        Read Article <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
function setBlogs(value: BlogApiResponse[]): BlogApiResponse[] | PromiseLike<BlogApiResponse[]> {
  throw new Error('Function not implemented.');
}

function setLoading(arg0: boolean): void {
  throw new Error('Function not implemented.');
}

