import React, { useState, useEffect } from 'react';
import { Play, Award, GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoCard: React.FC<{
  title: string;
  duration?: string;
  videoUrl?: string | null;
  className?: string;
}> = ({ title, duration = "00:46", videoUrl = null, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    if (videoUrl) {
      setIsPlaying(true);
    }
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
          {videoUrl && isPlaying ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              controls
              autoPlay
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center text-center px-4">
              <Play className="w-10 h-10 text-blue-700 mb-2" />
              <h3 className="text-sm font-semibold text-blue-900 leading-snug">
                {title}
              </h3>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white text-blue-700 text-xs font-semibold px-2 py-0.5 rounded shadow">
            {duration}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <h4 className="text-base font-bold text-gray-800 text-center mb-4 px-2">
            {title}
          </h4>
          <button className="mt-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-full text-sm font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all">
            ENROLL NOW
          </button>
        </div>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videoTopics = [
    "INCO TERMS",
    "METHODS OF RECEIVING PAYMENTS",
    "LETTER OF CREDIT",
    "STEPS IN EXPORT SHIPMENT",
    "TARIFF CLASSIFICATION",
    "GST",
    "HOW TO GET DUTY FREE INPUTS FOR EXPORTS",
    "INCENTIVE SCHEMES",
    "HOW TO ADDRESS QUALITY COMPLAINTS",
    "CAPITAL GOODS",
    "CERTIFICATE OF ORIGIN",
    "DIFFERENCE BETWEEN DTA, EOU & SEZS",
    "DOING BUSINESS IN INDIA",
    "FREE TRADE AGREEMENTS",
    "HOW TO START EXPORTS",
    "HOW TO FINANCE EXPORT BUSINESS",
    "HOW TO PACKAGE EXPORT GOODS"
  ];

  const videoUrls: Record<string, string | null> = {};

  return (
    <div className="pt-0 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-navy-50">
      {/* Header Section with Element Animations */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-indigo-700 to-blue-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="max-w-2xl">
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-14 h-14 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                <Award className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Certificate Course On
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Export Management
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-white/90 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Developed by the <span className="font-semibold text-amber-300">All India Chamber of Commerce (AICC)</span>, recognized by the Government of India.
            </motion.p>

            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold hover:scale-105 transition-transform"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span>ENROLL NOW</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Optional Icons (No Animation Applied) */}
          <div className="hidden md:flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-10 h-10 text-amber-400" />
            </div>
            <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

        </div>
      </div>

      {/* Course Content Section (No Animations) */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">COURSE CONTENT</h2>
            <p className="text-lg text-gray-600">
              Comprehensive video lessons covering all aspects of export management and international trade
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videoTopics.map((topic, index) => (
              <VideoCard key={index} title={topic} duration="00:46" videoUrl={videoUrls[topic] || null} />
            ))}
          </div>

          <div className="text-center bg-blue-900 rounded-3xl p-10 mt-16 shadow-xl relative overflow-hidden">
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
              <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform">
                <div className="flex items-center gap-2">
                  <span>ENROLL NOW</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Courses;
