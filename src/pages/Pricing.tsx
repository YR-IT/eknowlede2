import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Gift } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      icon: Gift,
      monthly: 0,
      annual: 0,
      color: "from-gray-400 to-gray-600",
      features: [
        "Access to free courses",
        "Basic community support",
        "Mobile app access",
        "Certificate of completion",
        "24/7 customer support"
      ],
      limitations: [
        "Limited course selection",
        "No premium content",
        "Basic video quality"
      ]
    },
    {
      name: "Pro",
      icon: Zap,
      monthly: 29,
      annual: 290,
      color: "from-indigo-500 to-purple-600",
      popular: true,
      features: [
        "Access to all courses",
        "HD video streaming",
        "Downloadable resources",
        "Priority community support",
        "Progress tracking",
        "Mobile offline access",
        "Expert Q&A sessions",
        "Professional certificates"
      ]
    },
    {
      name: "Enterprise",
      icon: Crown,
      monthly: 99,
      annual: 990,
      color: "from-purple-600 to-pink-600",
      features: [
        "Everything in Pro",
        "Team management dashboard",
        "Advanced analytics",
        "Custom learning paths",
        "Dedicated account manager",
        "API access",
        "White-label options",
        "Custom integrations",
        "Priority support",
        "Bulk user management"
      ]
    }
  ];

  const savings = (monthly, annual) => {
    if (monthly === 0) return 0;
    return Math.round(((monthly * 12 - annual) / (monthly * 12)) * 100);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your learning journey. All plans include access to our world-class content and community.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`font-medium ${!isAnnual ? 'text-indigo-600' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-indigo-600' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Save up to 17%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden ${
                plan.popular ? 'border-2 border-indigo-500' : 'border border-gray-200'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} text-white rounded-2xl mb-4`}>
                    <plan.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isAnnual ? plan.annual : plan.monthly}
                    </span>
                    {plan.monthly > 0 && (
                      <span className="text-gray-500">/{isAnnual ? 'year' : 'month'}</span>
                    )}
                  </div>

                  {isAnnual && plan.monthly > 0 && savings(plan.monthly, plan.annual) > 0 && (
                    <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block">
                      Save {savings(plan.monthly, plan.annual)}%
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation, i) => (
                    <li key={`limit-${i}`} className="flex items-start space-x-3 opacity-60">
                      <div className="h-5 w-5 mt-0.5 flex-shrink-0 border border-gray-300 rounded-full"></div>
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.monthly === 0 ? 'Get Started Free' : 'Start Free Trial'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start."
              },
              {
                question: "Do you offer student discounts?",
                answer: "Yes, we offer 50% discount for students with valid .edu email addresses."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to accelerate your learning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals advancing their careers with E-Knowledge.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;