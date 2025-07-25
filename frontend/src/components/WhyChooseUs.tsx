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
      {/* Features Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose E-Knowledge?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Experience the future of online learning with our innovative platform designed for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transform hover:scale-105 hover:-rotate-1 transition-all duration-300 flex flex-col items-center text-center border border-gray-100"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-md`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUS;
