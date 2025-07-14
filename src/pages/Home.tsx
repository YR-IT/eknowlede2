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

  const SlideIcon = slides[currentSlide].icon;

  return (
    <div className="pt-16">
      <section className="relative w-full h-screen flex items-center justify-center bg-black text-white">
        <img
          src={slides[currentSlide].image}
          alt="Slide Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="relative z-10 max-w-3xl px-4 text-center mx-auto flex flex-col justify-center items-center text-white h-full">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-full">
              <SlideIcon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-4 py-1.5 rounded-full">
              {slides[currentSlide].subtitle}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-6">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:shadow-md transition">
              Start Learning Now
              <ChevronRight className="inline-block ml-2 h-4 w-4" />
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=co.davos.yuoty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-white/80 text-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download App
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
          <button
            onClick={prevSlide}
            className="p-2 bg-white/20 rounded-full hover:bg-white/40"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
                i === currentSlide ? "bg-white scale-110" : "bg-white/50"
              }`}
            ></span>
          ))}
          <button
            onClick={nextSlide}
            className="p-2 bg-white/20 rounded-full hover:bg-white/40"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
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
