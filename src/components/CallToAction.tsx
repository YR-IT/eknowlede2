
const CallToAction = () => {
  return (
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
  );
};

export default CallToAction;
