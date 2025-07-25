import React, { useState, useEffect } from 'react';
import { Play, Award, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VideoCard: React.FC<{
  title: string;
  duration?: string;
  videoUrl?: string | null;
  thumbnail?: string | null;
  className?: string;
}> = ({ title, duration = "00:46", videoUrl = null, thumbnail = null, className = "" }) => {
  const [, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log("VideoCard Props:", { title, thumbnail, videoUrl });
  }, []);

  const handleVideoClick = () => {
    if (videoUrl) setIsPlaying(true);
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVideoClick}
    >
      <div className="bg-white rounded-3xl p-4 shadow-xl flex flex-col h-full overflow-hidden">
        <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
          {isPlaying && videoUrl ? (
            <video className="absolute inset-0 w-full h-full object-cover" controls autoPlay>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100 flex flex-col items-center justify-center text-center px-4">
                  <Play className="w-10 h-10 text-rose-700 mb-2" />
                  <h3 className="text-sm font-semibold text-rose-900 leading-snug">{title}</h3>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Play className="w-12 h-12 text-white opacity-90" />
              </div>
            </>
          )}
          <div className="absolute top-2 right-2 bg-white text-rose-700 text-xs font-semibold px-2 py-0.5 rounded shadow">
            {duration}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <h4 className="text-base font-bold text-gray-800 text-center mb-4 px-2">{title}</h4>
          <Link to="/enroll" className="mt-auto">
            <button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-2 rounded-full text-sm font-semibold shadow-md hover:from-pink-700 hover:to-rose-700 transition-all">
              ENROLL NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/courses`)
      .then(res => {
        console.log("Fetched Courses:", res.data);
        setCourses(res.data);
      })
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div className="pt-0 min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="relative bg-gradient-to-br from-rose-900 via-pink-800 to-fuchsia-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-600 via-rose-700 to-fuchsia-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-2/3 text-center md:text-left mt-8 sm:mt-10">
            <motion.div className="flex items-center justify-center md:justify-start gap-4 mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 p-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 p-1 bg-gradient-to-br from-emerald-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </motion.div>

            <motion.h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              Certificate Course On
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Export Management
              </span>
            </motion.h1>

            <motion.p className="text-base sm:text-lg text-white/90 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
              Developed by the <span className="font-semibold text-amber-300">All India Chamber of Commerce (AICC)</span>, recognized by the Government of India.
            </motion.p>

            <Link to="/enroll" className="inline-block">
              <motion.button className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold hover:scale-105 transition-transform" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <span>ENROLL NOW</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>

          <div className="w-full md:w-1/3 hidden md:flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-10 h-10 text-amber-400" />
            </div>
            <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 mb-4">COURSE CONTENT</h2>
            <p className="text-lg text-gray-600">
              Comprehensive video lessons covering all aspects of export management and international trade
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <VideoCard
                key={index}
                title={course.title}
                duration={course.duration}
                videoUrl={course.videoUrl}
                thumbnail={course.thumbnail}
              />
            ))}
          </div>

          <div className="text-center bg-rose-900 rounded-3xl p-10 mt-16 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Get Started Now with Affordable Cost
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of successful exporters who have transformed their business with our comprehensive certification program.
              </p>
              <Link to="/enroll" className="inline-block">
                <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2">
                    <span>ENROLL NOW</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;