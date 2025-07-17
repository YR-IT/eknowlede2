
import { Users, Zap, Award, BookOpen, Star } from "lucide-react";

const WhyChooseUS = () => {
  const stats = [
     { icon: Users, value: "50K+", label: "Active Students", color: "from-cyan-500 to-blue-600" },
     { icon: BookOpen, value: "200+", label: "Expert Courses", color: "from-emerald-500 to-teal-600" },
     { icon: Award, value: "95%", label: "Success Rate", color: "from-pink-500 to-rose-600" },
     { icon: Star, value: "4.9", label: "Average Rating", color: "from-amber-500 to-orange-600" }
   ];

  const features = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with real-world experience and cutting-edge knowledge.",
      color: "from-cyan-500 via-blue-500 to-indigo-600",
      icon: Users,
    },
    {
      title: "Interactive Learning",
      description: "Engage with hands-on projects, live coding sessions, and real-world simulations.",
      color: "from-emerald-500 via-teal-500 to-cyan-600",
      icon: Zap,
    },
    {
      title: "Lifetime Access",
      description: "Get unlimited access to course materials, updates, and our growing library.",
      color: "from-pink-500 via-rose-500 to-red-600",
      icon: Award,
    },
  ];

  return (
    <>
      {/* Stats Section */}
      {/* <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`inline-flex items-center justify-center sm:w-20 sm:h-20 h-16 w-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                >
                  <stat.icon className="sm:h-10 sm:w-10 h-8 w-8" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 text-transparent bg-clip-text mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
              Why Choose E-Knowledge?
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of online learning with our innovative platform designed for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {features.map((feature, index) => (
    <div
      key={index}
      className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-rotate-1 transition-all duration-300 flex flex-col items-center text-center border-2 border-gray-100"
    >
      <div
        className={`sm:w-16 sm:h-16 h-16 w-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}
      >
        <feature.icon className="sm:h-8 sm:w-8 h-8 w-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  ))}
</div>

        </div>
      </section>
    </>
  );
};

export default WhyChooseUS;
