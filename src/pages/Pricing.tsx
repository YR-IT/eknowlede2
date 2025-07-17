import { Check, Award, Users, Clock, BookOpen, Download, Star } from 'lucide-react';
import { useEffect } from 'react';

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 pt-20">
      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4 mx-auto">
          <Award className="w-4 h-4" />
          <span>Professional Certification</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          BUY CERTIFICATE COURSE ON
          <span className="block text-pink-600 mt-2">EXPORT MANAGEMENT</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 px-2">
          Master the fundamentals of international trade and export operations with our comprehensive certification program.
        </p>

        <div className="flex items-center justify-center">
          <div className="h-px bg-gray-300 w-20 sm:w-24"></div>
          <div className="h-2 bg-pink-500 w-12 sm:w-16 mx-4 rounded-full"></div>
          <div className="h-px bg-gray-300 w-20 sm:w-24"></div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Pricing Card */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  MOST POPULAR
                </div>
              </div>

              <div className="bg-pink-600 rounded-3xl p-8 text-center text-white shadow-2xl transform hover:scale-105 transition duration-300 mt-6 sm:mt-0">
                <div className="inline-flex items-center gap-2 bg-pink-500 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  Professional
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-lg opacity-90">INR</span>
                    <span className="text-5xl font-bold ml-2">15000</span>
                  </div>
                  <p className="text-base opacity-80">Per user, entire course</p>
                </div>

                <button className="w-full bg-white text-pink-600 py-3 rounded-xl text-lg font-bold hover:bg-gray-50 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  GET STARTED NOW
                </button>

                <div className="space-y-4 mt-8 text-left">
                  {[
                    'Lifetime access to materials',
                    'Mobile app access',
                    'Practical case studies',
                    'Expert instructor support',
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <Check className="w-5 h-5 text-orange-200" />
                      <span className="text-orange-50 text-lg">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Export Management Course?
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Get industry-recognized certification and practical skills to excel in international trade.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                {
                  icon: <BookOpen className="w-6 h-6 text-orange-600" />,
                  bg: 'bg-orange-100',
                  title: 'Comprehensive Curriculum',
                  desc: 'Complete export management training covering all aspects of international trade',
                },
                {
                  icon: <Award className="w-6 h-6 text-pink-600" />,
                  bg: 'bg-pink-100',
                  title: 'Industry Recognition',
                  desc: "Earn a certificate that's valued by employers worldwide",
                },
                {
                  icon: <Users className="w-6 h-6 text-purple-600" />,
                  bg: 'bg-purple-100',
                  title: 'Expert Support',
                  desc: 'Learn from industry experts with years of practical experience',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                >
                  <div className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">What You'll Get With This Course</h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to become a certified export management professional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <Clock className="w-8 h-8 text-orange-600" />,
                bg: 'bg-orange-100',
                title: 'Self-Paced Learning',
                desc: 'Learn at your own pace with 24/7 access to course materials',
              },
              {
                icon: <Download className="w-8 h-8 text-pink-600" />,
                bg: 'bg-pink-100',
                title: 'Downloadable Resources',
                desc: 'Access templates, guides, and reference materials offline',
              },
              {
                icon: <Award className="w-8 h-8 text-purple-600" />,
                bg: 'bg-purple-100',
                title: 'Professional Certificate',
                desc: 'Earn a recognized certificate upon course completion',
              },
            ].map((item, idx) => (
              <div key={idx}>
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {item.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-3xl p-6 sm:p-10 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Your Export Management Journey?</h3>
            <p className="text-pink-100 text-base sm:text-lg">
              Join thousands of professionals who have advanced their careers with our certification program
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
