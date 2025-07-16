
import { Check, Award, Users, Clock, BookOpen, Download, Star } from 'lucide-react';
import  { useEffect } from 'react';


const Pricing = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
 <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-18">


      {/* Hero Section */}
      <div className="px-3 xs:px-4 sm:px-6 md:px-7 lg:px-8 pt-14 xs:pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-6 xs:pb-7 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-16">

        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-blue-100 text-blue-700 px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium mb-3 xs:mb-4 sm:mb-6 whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
  <Award className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
  <span className="truncate">Professional Certification</span>
</div>

            
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 leading-tight px-1 xs:px-2">
              BUY CERTIFICATE COURSE ON
              <span className="block text-blue-600 mt-1 xs:mt-1.5 sm:mt-2">EXPORT MANAGEMENT</span>
            </h1>
            
            <p className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-8 px-2 xs:px-3 sm:px-4">
              Master the fundamentals of international trade and export operations with our comprehensive certification program
            </p>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center">
              <div className="h-px bg-gray-300 w-12 xs:w-16 sm:w-20 md:w-24 lg:w-32"></div>
              <div className="h-1 xs:h-1.5 sm:h-2 bg-blue-500 w-6 xs:w-8 sm:w-10 md:w-12 lg:w-16 mx-1.5 xs:mx-2 sm:mx-3 md:mx-4 rounded-full"></div>
              <div className="h-px bg-gray-300 w-12 xs:w-16 sm:w-20 md:w-24 lg:w-32"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Card Section */}
      <div className="px-3 xs:px-4 sm:px-6 md:px-7 lg:px-8 pb-8 xs:pb-10 sm:pb-12 md:pb-14 lg:pb-16 xl:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column - Pricing Card */}
            <div className="flex justify-center lg:justify-end lg:pr-2 xl:pr-4">
              <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm xl:max-w-xl">
                {/* Most Popular Badge */}
                <div className="absolute -top-2.5 xs:-top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gray-900 text-white px-3 xs:px-4 sm:px-5 md:px-6 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                    MOST POPULAR
                  </div>
                </div>

                {/* Pricing Card */}
                <div className="bg-blue-600 rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-12 text-center text-white shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-3xl h-full flex flex-col justify-center">
                  <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8">
                    <div className="inline-flex items-center gap-1.5 xs:gap-2 bg-blue-500 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                      <Star className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                      Professional
                    </div>
                    
                    <div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-base xs:text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-xl font-medium opacity-90">INR</span>
                        <span className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-7xl font-bold ml-1 xs:ml-1.5 sm:ml-2">15000</span>
                      </div>
                      <p className="text-xs xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-xl opacity-80">
                        Per user, entire course
                      </p>
                    </div>

                    <button className="w-full bg-white text-blue-600 px-4 xs:px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl text-sm xs:text-base sm:text-lg font-bold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-4 xs:mb-5 sm:mb-6 md:mb-8">
                      GET STARTED NOW
                    </button>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 xs:space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-5 text-left">
                    <div className="flex items-center gap-3">
                      <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-200 flex-shrink-0" />
                      <span className="text-blue-50 text-xs xs:text-sm sm:text-base md:text-base lg:text-lg">Lifetime access to materials</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-200 flex-shrink-0" />
                      <span className="text-blue-50 text-xs xs:text-sm sm:text-base md:text-base lg:text-lg">Mobile app access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-200 flex-shrink-0" />
                      <span className="text-blue-50 text-xs xs:text-sm sm:text-base md:text-base lg:text-lg">Practical case studies</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-200 flex-shrink-0" />
                      <span className="text-blue-50 text-xs xs:text-sm sm:text-base md:text-base lg:text-lg">Expert instructor support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Why Choose Content */}
            <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 lg:pl-2 xl:pl-4">
              <div>
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                  Why Choose Our Export Management Course?
                </h2>
                <p className="text-sm xs:text-base sm:text-lg md:text-lg text-gray-600 mb-4 xs:mb-5 sm:mb-6 md:mb-8">
                  Get industry-recognized certification and practical skills to excel in international trade.
                </p>
              </div>

              <div className="grid gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-4 p-3 xs:p-4 sm:p-5 md:p-6 bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Comprehensive Curriculum</h3>
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base">Complete export management training covering all aspects of international trade</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-4 p-3 xs:p-4 sm:p-5 md:p-6 bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Industry Recognition</h3>
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base">Earn a certificate that's valued by employers worldwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 xs:gap-3 sm:gap-4 p-3 xs:p-4 sm:p-5 md:p-6 bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Expert Support</h3>
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base">Learn from industry experts with years of practical experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Get Section */}
      <div className="px-3 xs:px-4 sm:px-6 md:px-7 lg:px-8 pb-8 xs:pb-10 sm:pb-12 md:pb-14 lg:pb-16 xl:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-6 xs:mb-7 sm:mb-8 md:mb-10 lg:mb-12">
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                What You'll Get With This Course
              </h3>
              <p className="text-sm xs:text-base sm:text-lg md:text-lg text-gray-600 max-w-2xl mx-auto px-2 xs:px-0">
                Everything you need to become a certified export management professional
              </p>
            </div>

            <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8">
              <div className="text-center">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-xl xs:rounded-2xl flex items-center justify-center mx-auto mb-2.5 xs:mb-3 sm:mb-4">
                  <Clock className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Self-Paced Learning</h4>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base px-2 xs:px-0">Learn at your own pace with 24/7 access to course materials</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-xl xs:rounded-2xl flex items-center justify-center mx-auto mb-2.5 xs:mb-3 sm:mb-4">
                  <Download className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Downloadable Resources</h4>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base px-2 xs:px-0">Access templates, guides, and reference materials offline</p>
              </div>

              <div className="text-center xs:col-span-1 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-purple-100 rounded-xl xs:rounded-2xl flex items-center justify-center mx-auto mb-2.5 xs:mb-3 sm:mb-4">
                  <Award className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Professional Certificate</h4>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base px-2 xs:px-0">Earn a recognized certificate upon course completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-3 xs:px-4 sm:px-6 md:px-7 lg:px-8 pb-8 xs:pb-10 sm:pb-12 md:pb-14 lg:pb-16 xl:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-white">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-2.5 xs:mb-3 sm:mb-4">Ready to Start Your Export Management Journey?</h3>
            <p className="text-blue-100 text-xs xs:text-sm sm:text-base md:text-base lg:text-lg max-w-2xl mx-auto px-2 xs:px-0">
              Join thousands of professionals who have advanced their careers with our certification program
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;