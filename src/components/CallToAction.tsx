import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/20"></div> {/* lighter overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-8">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg sm:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto">
          Join millions of learners worldwide and unlock your potential with our expert-led courses.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/contact">
            <button className="bg-white text-blue-600 sm:px-8 sm:py-4 px-5 py-4 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get Started Free
            </button>
          </Link>
          <Link to="/courses">
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300">
              View All Courses
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
