import { ChevronRight, Download } from "lucide-react";
import { useState, useEffect } from "react";
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
    <div className="pt-16">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-green-100 via-white to-blue-100 py-12 md:py-20 transition-all duration-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
    
    {/* Left: Text */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <span className="inline-block mb-3 text-sm font-semibold px-4 py-1 bg-white rounded-full text-gray-700 shadow">
        {slides[currentSlide].subtitle}
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
        {slides[currentSlide].title}
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mt-4 mb-6">
        {slides[currentSlide].description}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold text-sm shadow transition">
          Start Learning
          <ChevronRight className="inline ml-2 w-4 h-4" />
        </button>
        <a
          href="https://play.google.com/store/apps/details?id=co.davos.yuoty"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Download App
        </a>
      </div>
    </div>

    {/* Right: Image */}
    <div className="md:w-1/2 flex justify-center items-center">
  <div className="w-full max-w-sm h-[250px] overflow-hidden rounded-2xl shadow-lg">
    <img
      src={slides[currentSlide].image}
      alt="Hero Slide"
      className="w-full h-full object-cover"
    />
  </div>
</div>
</div>

  {/* Dots */}
  <div className="mt-8 flex justify-center items-center gap-3">
    {slides.map((_, idx) => (
      <span
        key={idx}
        onClick={() => setCurrentSlide(idx)}
        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
          idx === currentSlide ? "bg-pink-600 scale-110" : "bg-gray-300"
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
