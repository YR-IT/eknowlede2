import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-cyan-100 via-blue-200 to-purple-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/20"></div> {/* lighter overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg sm:text-xl text-gray-800 mb-12 max-w-3xl mx-auto">
          Join millions of learners worldwide and unlock your potential with our expert-led courses.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
  <Link to="/contact">
    <button className="bg-white text-blue-600 px-5 py-2 rounded-2xl text-lg font-semibold hover:shadow-2xl border-2 border-white box-border">
      Get Started Free
    </button>
  </Link>
  <Link to="/courses">
    <button className="border-2 border-blue-600 text-blue-600 px-5 py-2 rounded-2xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 box-border">
      View All Courses
    </button>
  </Link>
</div>
      </div>
    </section>
  );
};

export default CallToAction;
