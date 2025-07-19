"use client";

import { Download, UserPlus, ShoppingCart, BookOpen } from "lucide-react";

const steps = [
  {
    title: "Download the App",
    description: "Get the app from Google Play Store for free and install it instantly.",
    icon: Download,
    color: "from-indigo-400 to-indigo-600"
  },
  {
    title: "Create an Account",
    description: "Sign up quickly with your mobile number and verify it securely.",
    icon: UserPlus,
    color: "from-amber-400 to-amber-600"
  },
  {
    title: "Buy the Course",
    description: "Browse and purchase your favorite course directly inside the app.",
    icon: ShoppingCart,
    color: "from-pink-400 to-pink-600"
  },
  {
    title: "Learn Online",
    description: "Start your learning journey anytime, anywhere and gain new skills.",
    icon: BookOpen,
    color: "from-green-400 to-green-600"
  },
];

const GetStarted = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-300 to-purple-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-green-300 to-emerald-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          How Can You Get Started?
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-600">
          Follow these simple steps to begin your learning journey with us.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2 border-2 border-gray-100"
            >
              <div
                className={`p-4 rounded-full bg-gradient-to-br ${step.color} text-white shadow-lg mb-4 transform transition-transform duration-300 group-hover:rotate-6`}
              >
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
