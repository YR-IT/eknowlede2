import React from 'react';
import { Clock, PlayCircle, FileText, Download, Smartphone, ChevronDown, Tag, Users, BookOpen, Shield, Award, Lock } from 'lucide-react';
import  { useEffect } from 'react';


function EnrollNow()

 {
    const [showForm, setShowForm] = React.useState(false);

const openForm = () => setShowForm(true);
const closeForm = () => setShowForm(false);

const [showContactForm, setShowContactForm] = React.useState(false);

const openContactForm = () => setShowContactForm(true);
const closeContactForm = () => setShowContactForm(false);


    
  const [activeTab, setActiveTab] = React.useState('OVERVIEW');

  const courseContent = [
    {
      id: 1,
      title: "How to start Exports - Step Wise Procedure",
      type: "PDF",
      icon: "pdf",
      locked: true
    },
    {
      id: 2,
      title: "A note on Export Documentation",
      type: "PDF", 
      icon: "pdf",
      locked: true
    },
    {
      id: 3,
      title: "Deep Insight into Export Documentation",
      type: "PDF",
      icon: "pdf", 
      locked: true
    },
    {
      id: 4,
      title: "Understanding Export Documentation",
      type: "PDF",
      icon: "pdf",
      locked: true
    },
    {
      id: 5,
      title: "Exports Made Easy",
      type: "Video",
      icon: "video",
      locked: true
    },
    {
      id: 6,
      title: "Module 1",
      type: "Test",
      icon: "test",
      locked: true
    }
  ];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const getIcon = (type: string) => {
    switch(type) {
      case 'pdf':
        return (
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-red-500 rounded text-white text-xs font-bold flex items-center justify-center">
              PDF
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-blue-600" />
          </div>
        );
      case 'test':
        return (
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
              A
            </div>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
        );
    }
    
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
     {/* Header */}
<header className="bg-white shadow-sm border-b sticky top-0 z-50">
  <div className="w-full px-4 sm:px-6 lg:px-12">
    <div className="flex items-center justify-between h-14 sm:h-16">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-24 h-24">
          <img
            src="/e-learning-logo.jpg"
            alt="eKnowledge Logo"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">
            eKnowledge - An AICC initiative
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Android App */}
        <a
          href="https://play.google.com/store/apps/details?id=co.davos.yuoty"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Android App</span>
        </a>

        {/* App Store */}
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span className="text-xs sm:text-sm">App Store</span>
        </a>

        {/* Login */}
        <a
          href="https://web.classplusapp.com/login?orgCode=yuoty"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Login
        </a>
      </div>
    </div>
  </div>
</header>


      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-12 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>Certificate Course</span>
                </span>
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-teal-100 text-teal-700 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Exports</span>
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">Certificate Course on Export Management</h1>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">TEST</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">PDFs</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6 lg:mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  <button 
                    onClick={() => setActiveTab('OVERVIEW')}
                    className={`px-4 sm:px-8 py-3 sm:py-4 font-semibold whitespace-nowrap transition-colors ${
                      activeTab === 'OVERVIEW' 
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    OVERVIEW
                  </button>
                  <button 
                    onClick={() => setActiveTab('CONTENT')}
                    className={`px-4 sm:px-8 py-3 sm:py-4 font-semibold whitespace-nowrap transition-colors ${
                      activeTab === 'CONTENT' 
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    CONTENT
                  </button>
                </nav>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                {activeTab === 'OVERVIEW' ? (
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">About This Course</h2>
                    <div className="prose prose-sm sm:prose-base lg:prose-lg text-gray-700 max-w-none">
                      <p className="mb-4 sm:mb-6 leading-relaxed">
                        This is a Certificate Course in Exports, developed by All India Chamber of Commerce (AICC), which is a National Chamber 
                        of Commerce duly recognized and licenced by Govt of India. The Course has been developed by the Research Team of 
                        AICC. The technical support has been provided by DGFT, Govt of India.
                      </p>
                      <p className="mb-4 sm:mb-6 leading-relaxed">
                        The course covers all the steps involved in Exporting a Product from India and gives working knowledge on Export Documentation. 
                        The Steps and Documentation are explained through Videos and PDF and Slides. The duration of the course is 3 months. At the end of the course, 
                        participants will receive a comprehensive certificate validating their expertise in export management.
                      </p>
                      <p className="mb-4 sm:mb-6 leading-relaxed">
                        This comprehensive program is designed for professionals, entrepreneurs, and students who want to understand the intricacies 
                        of international trade and export procedures from India.
                      </p>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 mt-6 sm:mt-8">What You'll Learn</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        <span className="text-sm sm:text-base text-gray-700">Export documentation procedures</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        <span className="text-sm sm:text-base text-gray-700">International trade regulations</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        <span className="text-sm sm:text-base text-gray-700">Export financing and insurance</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        <span className="text-sm sm:text-base text-gray-700">Market research and analysis</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Course Content</h2>
                    <div className="space-y-4">
                      {courseContent.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-4">
                            {getIcon(item.icon)}
                            <div>
                              <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-500">{item.type}</p>
                            </div>
                          </div>
                          {item.locked && (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">Course Access</h4>
                          <p className="text-sm text-blue-700">Purchase this course to unlock all materials and get lifetime access to the content.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Course Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 lg:mb-8">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">3 Month Validity</h3>
                    <p className="text-sm sm:text-base text-gray-600">Full access for 3 months</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600">You will get this course for 3 full months with unlimited access to all materials</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">6 Learning Materials</h3>
                    <p className="text-sm sm:text-base text-gray-600">Comprehensive resources</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600">5 Files, 1 Test - Everything you need to master export management</p>
              </div>
            </div>

            {/* About Course Creator */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">About Course Creator</h2>
              
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">All India Chamber of Commerce</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                    It is a national chamber of commerce, recognized, registered and licenced by Govt of India. 
                    AICC has been instrumental in promoting trade and commerce across India with decades of experience 
                    in international business development.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">25+ Students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">2 Courses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">Govt Recognized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-24">
              {/* Course Image */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-6 sm:p-8 mb-4 sm:mb-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">Exports</h3>
                  <p className="text-lg sm:text-xl mb-3 sm:mb-4">Made Easy</p>
                  <div className="text-xs sm:text-sm opacity-90">
                    <p className="mb-1">DEVELOPED BY RESEARCH TEAM OF</p>
                    <p className="font-semibold">ALL INDIA CHAMBER OF COMMERCE</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Certificate Course on Export Management</h3>
              
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 font-medium">You Pay</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">₹ 15,421</div>
                <div className="text-sm text-gray-500">
                  <span className="line-through">₹ 20,000</span>
                  <span className="ml-2 text-teal-600 font-medium">23% OFF</span>
                </div>
              </div>

<button
  onClick={openForm}
  className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-4 text-base sm:text-lg"
>
  Get this course
</button>


           {/* Coupon Section */}
<div className="bg-teal-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-teal-100">
  <div className="flex items-start space-x-3">
    <Tag className="w-5 h-5 text-teal-600 mt-0.5" />
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Have a coupon code?</h4>
      <p className="text-sm text-gray-600 mb-3">Click above to find available coupons and get extra discounts.</p>
      
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter code"
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm">
          Apply 
        </button>
      </div>
    </div>
  </div>
</div>

              {/* Course Highlights */}
              <div className="space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span>Government recognized certificate</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>3 months full access</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <PlayCircle className="w-4 h-4 text-teal-600" />
                  <span>Video lectures & PDFs</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed text-center sm:text-left">
                * Amount payable is inclusive of taxes. <a href="#" className="text-teal-600 hover:text-teal-700">Terms & Conditions</a> apply.
              </p>
            </div>
          </div>
        </div>
      </main>

     {/* Footer */}
<footer className="bg-gray-900 text-white mt-16">
  <div className="w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
    <div className="text-center">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Have a query?</h3>
      <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
        Contact us and we will get back to you on your number
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        {/* Contact Us Button */}
        <button
          onClick={openContactForm}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm sm:text-base w-full sm:w-auto"
        >
          Contact Us
        </button>

        {/* View Privacy Policy Button */}
        <a
          href="https://privacy-policy.courses.store/yuoty?defaultLanguage=EN" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded text-sm sm:text-base w-full sm:w-auto text-center"
        >
          View Privacy Policy
        </a>
      </div>
    </div>
  </div>
</footer>


     { /*get the course*/}
  {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        onClick={closeForm}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
      >
        ×
      </button>
      <h2 className="text-lg font-semibold mb-4">Please fill the details</h2>
      <form className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Harsh"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <span className="text-gray-500 mr-2">IN</span>
            <input
              type="tel"
              placeholder="e.g. 81XXXXXXXX"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State<span className="text-red-500">*</span>
          </label>
          <select className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Karnataka</option>
            <option>Uttar Pradesh</option>
            <option>Other</option>
          </select>
        </div>

        {/* Submit Button (Enabled) */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Verify via OTP
        </button>
      </form>
    </div>
  </div>
)}
{/*contactus*/}
{showContactForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
      <button
        onClick={closeContactForm}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-2">Tell us your query</h2>
      <p className="text-gray-600 mb-4">We will get back to you shortly on your number</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            placeholder="Write your query..."
            className="mt-1 p-2 w-full border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}



    </div>
  );
}

export default EnrollNow;