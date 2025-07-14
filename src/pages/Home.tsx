import { useState, useEffect } from "react";
import {
  Star,
  Users,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Target,
  Download,
} from "lucide-react";
import WhyChooseUS from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import GetStarted from "../components/GetStarted";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Master the Future of Technology",
      subtitle: "AI & Machine Learning",
      description:
        "Dive deep into artificial intelligence, neural networks, and cutting-edge machine learning algorithms that are shaping tomorrow's world.",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-sky-400 via-blue-500 to-indigo-600",
      icon: Sparkles,
    },
    {
      title: "Build Amazing Web Experiences",
      subtitle: "Full-Stack Development",
      description:
        "Create stunning, responsive websites and powerful web applications using the latest frameworks and technologies.",
      image:
        "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-emerald-500 via-teal-600 to-blue-700",
      icon: Zap,
    },
    {
      title: "Launch Your Digital Empire",
      subtitle: "Digital Marketing & Business",
      description:
        "Master the art of digital marketing, social media strategy, and online business growth to build your empire.",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200",
      gradient: "from-rose-500 via-pink-600 to-orange-500",
      icon: Target,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="pt-16">
      <section className="relative w- h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-full"
              }`}
            >
              {/* Background Gradient & Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-90 z-0`}
              />
              <div className="absolute inset-0 bg-black/30 z-0" />

              {/* Slide Content */}
              <div className="relative z-10 flex items-center justify-center w-full h-full px-4 sm:px-8">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full">
                  {/* Text Section */}
                  <div className="text-white text-center lg:text-left flex flex-col justify-center space-y-4">
                    <div className="flex justify-center lg:justify-start items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <slide.icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-medium bg-white/20 px-4 py-1.5 rounded-full">
                        {slide.subtitle}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-snug">
                      {slide.title}
                    </h1>

                    <p className="text-sm sm:text-base text-white/90 max-w-md mx-auto lg:mx-0">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button className="group bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-md transition">
                        Start Learning Now
                        <ChevronRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <a
                        href="https://play.google.com/store/apps/details?id=co.davos.yuoty"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white hover:text-white/80 text-sm"
                      >
                        <div className="p-2 bg-white/20 rounded-full mr-2">
                          <Download className="h-4 w-4" />
                        </div>
                        Download App
                      </a>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="relative w-full flex justify-center items-center">
                    <div className="overflow-hidden rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md h-[280px] sm:h-[360px]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    <div className="absolute -top-3 -right-3 bg-white/90 p-2 rounded-xl shadow">
                      <Star className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="absolute -bottom-3 -left-3 bg-white/90 p-2 rounded-xl shadow">
                      <Users className="h-4 w-4 text-emerald-500" />
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
          className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-110" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      <GetStarted />
      <WhyChooseUS />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
