import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
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
  
    useEffect(() => {
      const testimonialTimer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(testimonialTimer);
    }, []);
  

  return (
    <section className="py-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-rose-500/20 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
            What Our Students Say
          </h2>
          <p className="sm:text-lg text-base text-gray-300 max-w-3xl mx-auto">
            Join thousands of successful learners who have transformed their careers with E-Knowledge.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center border border-white/20 shadow-2xl">
            <Quote className="h-12 w-12 text-cyan-400 mx-auto mb-6" />

            <div className="mb-6">
              <p className="text-lg md:text-2xl text-gray-100 mb-4 leading-relaxed font-light">
                "{testimonials[currentTestimonial].content}"
              </p>

              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
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
                <h4 className="text-xl font-bold text-white">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-cyan-300 text-base">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-cyan-400 scale-125 shadow-lg"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
