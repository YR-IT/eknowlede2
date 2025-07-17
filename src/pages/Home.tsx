import { ChevronRight, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhyChooseUS from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import GetStarted from "../components/GetStarted";

const slides = [
  {
    title: "Certificate Course on Export Management",
    subtitle: "eKnowledge – An AICC Initiative",
    description:
      "eKnowledge is an online platform for the Export Management course in the most efficient and transparent manner.",
    image:
      "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Empowering Your Online Career",
    subtitle: "Global Learning Platform",
    description:
      "Join a community of learners and get certified with expert-led courses, real-world projects, and mentorship.",
    image:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Master Export Management Today",
    subtitle: "Structured & Practical Learning",
    description:
      "Step-by-step modules, hands-on assignments, and expert support — everything you need to excel.",
    image:
      "https://images.pexels.com/photos/3184304/pexels-photo-3184304.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="w-full h-[90vh] bg-[#0d0f23] relative overflow-hidden flex items-center py-12 md:py-24 text-white transition-all duration-700">
        {/* Background Grid & Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1c3b] via-[#0d0f23] to-[#0d0f23] z-0" />
        <div className="absolute w-full h-full z-0">
          <div className="absolute left-[10%] top-[20%] w-2 h-2 bg-pink-500 rounded-full blur-sm opacity-70 animate-pulse" />
          <div className="absolute right-[20%] top-[40%] w-3 h-3 bg-yellow-400 rounded-full blur-sm opacity-60 animate-ping" />
          <div className="absolute left-[30%] bottom-[10%] w-4 h-4 bg-blue-400 rounded-full blur-sm opacity-50 animate-bounce" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl z-10 container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 text-sm md:text-base font-semibold px-5 py-2 bg-pink-600/10 border border-pink-500 rounded-full text-pink-400"
              >
                {slides[currentSlide].subtitle}
              </motion.span>

              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-relaxed text-balance"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl mt-6 text-gray-300 leading-snug"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                key={`buttons-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center md:justify-start gap-6 w-full"
              >
                <button className="bg-[#C21E53] text-white px-5 py-2 rounded-full font-semibold text-base shadow-lg transition-all duration-300 ">
                  Start Learning
                  <ChevronRight className="inline ml-2 w-5 h-5" />
                </button>
                <a
                  href="https://play.google.com/store/apps/details?id=co.davos.yuoty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white font-medium text-base"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download App
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Image */}
          <motion.div
            key={`image-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 w-full flex justify-center items-center"
          >
            <div className="w-full max-w-md max-w-full aspect-video overflow-hidden rounded-2xl shadow-xl">
              <img
                src={slides[currentSlide].image}
                alt="Hero Slide"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-10">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer transition-all duration-300 ${
                idx === currentSlide ? "bg-[#C21E53] scale-125" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Additional Sections */}
      <GetStarted />
      <WhyChooseUS />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;