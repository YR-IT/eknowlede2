import React, { useState, useEffect } from 'react';
import { Play, Award, GraduationCap, ArrowRight } from 'lucide-react';

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
    <div className="pt-10 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-navy-50">
      <div className="min-h-[50vh] flex items-start justify-center pt-10 sm:pt-16 bg-blue-900 relative overflow-hidden">
        <div className="relative z-10 w-full max-w-5xl px-4">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                <Award className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
            CERTIFICATE COURSE ON
            <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mt-2">
              EXPORT MANAGEMENT
            </span>
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-4 mb-8" />

          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 shadow-2xl max-w-2xl text-center text-white text-base leading-relaxed">
              This <span className="font-semibold text-amber-300">Certificate Course in Exports</span> is developed by the <span className="font-semibold text-blue-300">All India Chamber of Commerce (AICC)</span>, recognized by the Government of India.
            </div>
          </div>
        </div>
      </div>

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
