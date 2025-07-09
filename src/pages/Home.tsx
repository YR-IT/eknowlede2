import { useState, useEffect } from 'react';
import { Play, Star, Users, ChevronRight, ChevronLeft, Sparkles, Zap, Target } from 'lucide-react';
import WhyChooseUS from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Master the Future of Technology",
      subtitle: "AI & Machine Learning",
      description: "Dive deep into artificial intelligence, neural networks, and cutting-edge machine learning algorithms that are shaping tomorrow's world.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      icon: Sparkles
    },
    {
      title: "Build Amazing Web Experiences",
      subtitle: "Full-Stack Development",
      description: "Create stunning, responsive websites and powerful web applications using the latest frameworks and technologies.",
      image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-emerald-400 via-teal-500 to-blue-600",
      icon: Zap
    },
    {
      title: "Launch Your Digital Empire",
      subtitle: "Digital Marketing & Business",
      description: "Master the art of digital marketing, social media strategy, and online business growth to build your empire.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-pink-400 via-rose-500 to-orange-600",
      icon: Target
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="pt-16">
      {/* Hero Slideshow Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-40 w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Slides */}
        <div className="relative h-screen">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-90`}></div>
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">

                    {/* Content */}
                    <div className="text-white">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                          <slide.icon className="h-8 w-8" />
                        </div>
                        <span className="text-xl font-semibold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                          {slide.subtitle}
                        </span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
  {slide.title}
</h1>

<p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 leading-relaxed">
  {slide.description}
</p>

                      
<div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6">

                        <button className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                          Start Learning Now
                          <ChevronRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                        
                        <button className="group flex items-center space-x-3 text-white hover:text-white/80 transition-colors duration-300">
                          <div className="p-3 bg-white/20 backdrop-blur-md rounded-full group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                            <Play className="h-6 w-6" />
                          </div>
                          <span className="font-medium">Watch Preview</span>
                        </button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <img
  src={slide.image}
  alt={slide.title}
  className="w-full h-60 sm:h-80 md:h-96 object-cover"
/>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg animate-bounce">
                        <Star className="h-6 w-6 text-amber-500" />
                      </div>
                      <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg animate-pulse">
                        <Users className="h-6 w-6 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
  onClick={prevSlide}
  className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-300 group"
>
  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
</button>

<button
  onClick={nextSlide}
  className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-300 group"
>
  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
</button>


        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">

          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      <WhyChooseUS />

      <Testimonials />

      <CallToAction/>
    </div>
  );
};

export default Home;