import React, { useState, useEffect } from 'react';
import { Play, Star, Users, BookOpen, Award, ChevronRight, Quote, ChevronLeft, Sparkles, Zap, Target } from 'lucide-react';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "E-Knowledge transformed my career! The courses are comprehensive and the instructors are world-class.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      image: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "Amazing platform with cutting-edge content. I've learned more here than in years of traditional education.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Marketer",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      content: "The interactive learning experience is phenomenal. Highly recommend to anyone looking to upskill.",
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Students", color: "from-cyan-500 to-blue-600" },
    { icon: BookOpen, value: "200+", label: "Expert Courses", color: "from-emerald-500 to-teal-600" },
    { icon: Award, value: "95%", label: "Success Rate", color: "from-pink-500 to-rose-600" },
    { icon: Star, value: "4.9", label: "Average Rating", color: "from-amber-500 to-orange-600" }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialTimer);
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                      
                      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      
                      <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                        {slide.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-6">
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
                          className="w-full h-96 object-cover"
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
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-300 group"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-300 group"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} text-white rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <stat.icon className="h-10 w-10" />
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-transparent bg-clip-text mb-6">
              Why Choose E-Knowledge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of online learning with our innovative platform designed for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Instructors",
                description: "Learn from industry professionals with real-world experience and cutting-edge knowledge",
                color: "from-cyan-500 via-blue-500 to-indigo-600",
                icon: Users
              },
              {
                title: "Interactive Learning",
                description: "Engage with hands-on projects, live coding sessions, and real-world simulations",
                color: "from-emerald-500 via-teal-500 to-cyan-600",
                icon: Zap
              },
              {
                title: "Lifetime Access",
                description: "Get unlimited access to course materials, updates, and our growing library",
                color: "from-pink-500 via-rose-500 to-red-600",
                icon: Award
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-rose-500/20 rounded-full animate-bounce"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of successful learners who have transformed their careers with E-Knowledge.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center border border-white/20 shadow-2xl">
              <Quote className="h-16 w-16 text-cyan-400 mx-auto mb-8" />
              
              <div className="mb-8">
                <p className="text-2xl md:text-3xl text-gray-100 mb-8 leading-relaxed font-light">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center space-x-6">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
                />
                <div className="text-left">
                  <h4 className="text-2xl font-bold text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-cyan-300 text-lg">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-cyan-400 scale-125 shadow-lg'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join millions of learners worldwide and unlock your potential with our expert-led courses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get Started Free
            </button>
            <button className="border-3 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
              View All Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;