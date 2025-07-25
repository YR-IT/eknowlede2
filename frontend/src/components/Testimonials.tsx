import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      image:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
      content:
        "E-Knowledge transformed my career! The courses are comprehensive and the instructors are world-class.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      image:
        "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=400",
      content:
        "Amazing platform with cutting-edge content. I've learned more here than in years of traditional education.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Marketer",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      content:
        "The interactive learning experience is phenomenal. Highly recommend to anyone looking to upskill.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialTimer);
  }, []);

  return (
    <section className="py-12 bg-pink-50 text-gray-800 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            What Our Students Say
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto mt-4">
            Join thousands of successful learners who have transformed their careers with E-Knowledge.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 text-center border border-gray-200 shadow-lg">
            <Quote className="h-12 w-12 text-pink-500 mx-auto mb-4" />

            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 leading-relaxed font-light">
              "{testimonials[currentTestimonial].content}"
            </p>

            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
              ))}
            </div>

            <div className="flex items-center justify-center space-x-5">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full object-cover border-4 border-pink-300 shadow-md"
              />
              <div className="text-left">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-sm text-pink-500">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-pink-500 scale-125 shadow"
                    : "bg-gray-300 hover:bg-gray-400"
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
