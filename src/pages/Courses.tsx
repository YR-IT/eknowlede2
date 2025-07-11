import React, { useState, useEffect } from 'react';
import { Play, Award, GraduationCap, ArrowRight } from 'lucide-react';

type VideoCardProps = {
  title: string;
  duration?: string;
  videoUrl?: string | null;
  className?: string;
};

const VideoCard: React.FC<VideoCardProps> = ({ title, duration = "00:46", videoUrl = null, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    if (videoUrl) {
      setIsPlaying(true);
      console.log(`Playing video: ${title}`);
    }
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVideoClick}
    >
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-4 border border-slate-200 shadow-sm h-full flex flex-col">
        <div className="relative overflow-hidden rounded-xl aspect-[16/10] border-2 border-gray-200 shadow-lg mb-4 flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200">
          {videoUrl && (
            <video
              className={`absolute inset-0 w-full h-full object-cover ${isPlaying ? 'block' : 'hidden'}`}
              controls={isPlaying}
              poster=""
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <div className={`${isPlaying && videoUrl ? 'hidden' : 'block'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 opacity-90"></div>

            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-center text-gray-800 leading-tight">
                {title}
              </h3>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isHovered ? 'scale-110 bg-blue-700' : ''}`}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white ml-0.5" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-1.5 sm:p-2 text-xs text-white flex items-center justify-between">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-white bg-opacity-30 rounded">
                  <div className="w-2 sm:w-3 h-0.5 sm:h-1 bg-white rounded"></div>
                </div>
                <span className="text-xs font-medium">{duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 sm:w-4 h-2 sm:h-3 bg-white bg-opacity-30 rounded-sm"></div>
                <div className="w-3 sm:w-4 h-2 sm:h-3 bg-white bg-opacity-30 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center px-2">
            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-navy-800 text-center leading-tight">
              {title}
            </h4>
          </div>

          <div className="mt-4">
            <button
              className={`w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-900 text-white rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:from-navy-700 hover:to-blue-700 hover:shadow-lg ${isHovered ? 'transform scale-105' : ''}`}
            >
              ENROLL NOW
            </button>
          </div>
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

  const videoUrls: Record<string, string | null> = {
    // Example: "INCO TERMS": "/videos/inco.mp4"
  };

  return (
    <div className="pt-10 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-navy-50">
      
      {/* Hero Section */}
      {/* Hero Section */}
<div className="min-h-[50vh] flex items-start justify-center pt-10 sm:pt-16 bg-blue-900 relative overflow-hidden">
  <div className="relative z-10 w-full max-w-5xl px-4">
    {/* Logo */}
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

    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight text-center">
      CERTIFICATE COURSE ON
      <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mt-2">
        EXPORT MANAGEMENT
      </span>
    </h1>

    {/* Gradient Divider */}
    <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-4 sm:mb-6"></div>

    {/* Description Box - Reduced width + extra gap below */}
    <div className="flex justify-center mb-10 sm:mb-12">
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 border border-white/20 shadow-2xl max-w-2xl text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-60"></div>

        <div className="relative z-10 text-gray-100 text-sm sm:text-base md:text-lg leading-relaxed">
          <p>
            This <span className="font-semibold text-amber-300 bg-amber-400/20 px-2 py-1 rounded-lg">Certificate Course in Exports</span> is developed by the <span className="font-semibold text-blue-300 bg-blue-400/20 px-2 py-1 rounded-lg ml-1">All India Chamber of Commerce (AICC)</span>, recognized by the Government of India.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Course Content */}
      <div className="pt-10 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-navy-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4 sm:mb-5">
              COURSE CONTENT
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-navy-600 to-blue-600 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive video lessons covering all aspects of export management and international trade
            </p>
          </div>

          <div className="mb-16 sm:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 sm:gap-8 auto-rows-fr">
              {videoTopics.map((topic, index) => (
                <VideoCard key={index} title={topic} duration="00:46" videoUrl={videoUrls[topic] || null} />
              ))}
            </div>
          </div>

          <div className="text-center bg-blue-900 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl mx-2 sm:mx-0 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
                Get Started Now with Affordable Cost
              </h3>
              <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto px-2 leading-relaxed">
                Join thousands of successful exporters who have transformed their business with our comprehensive certification program.
              </p>
              <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-8 sm:px-12 md:px-16 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg md:text-xl hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-3 mx-auto">
                <span>ENROLL NOW</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Courses;
