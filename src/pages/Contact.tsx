import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@aicc.ind.in",
      subtext: "We'll respond within 24 hours",
      color: "from-[#C21E53] to-[#C21E53]"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 9990733308",
      subtext: "Mon-Fri, 9 AM - 6 PM IST",
      color: "from-[#C21E53] to-[#C21E53]"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: `Unit No. 339, 3rd Floor,\nTower B-3, Spaze Itech-Park\nSector-49, Sohna Road,\nGurgaon – 122001 (HR)\nIndia`,
      subtext: "",
      color: "from-[#C21E53] to-[#C21E53]"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      details: "Available 24/7",
      subtext: "Get instant support",
      color: "from-[#C21E53] to-[#C21E53]"
    }
  ];

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "Simply browse our course catalog, select the course you want, and click 'Enroll Now'. You can pay securely online and start learning immediately."
    },
    {
      question: "Do you offer certificates?",
      answer: "Yes! All our courses come with completion certificates that you can add to your LinkedIn profile or resume."
    },
    {
      question: "Can I access courses on mobile?",
      answer: "Absolutely! Our platform is fully responsive and we also have mobile apps for iOS and Android for learning on the go."
    },
  ];

  return (
    <div className="pt-16 pb-10" style={{ backgroundColor: '#FFF4EC' }}>
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#C21E53] via-[#C21E53] to-[#C21E53] py-20 px-6 text-center text-white mb-16 shadow-md">
        <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm mb-4 font-semibold tracking-wide">
          📜 Professional Certification
        </span>
        <h1 className="max-w-4xl mx-auto text-4xl md:text-6xl font-bold mb-4 text-center">
  Buy Certificate Course on <span className="text-orange-200">Export Management</span>
</h1>

        <p className="text-xl max-w-3xl mx-auto mb-6 opacity-90">
          Master the fundamentals of international trade and export operations with our comprehensive certification program.
        </p>
        <a
          href="#contact-form"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-block bg-white text-[#7a0025] font-semibold px-4 py-2 rounded-full shadow hover:bg-red-100 transition"
        >
          Contact Our Team
        </a>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                <info.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h3>
              <p className="text-[#7a0025] font-medium whitespace-pre-line">{info.details}</p>
              <p className="text-sm text-gray-500">{info.subtext}</p>
            </div>
          ))}
        </div>

        {/* Form and FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div id="contact-form" className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl text-center font-bold text-gray-800 mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a0025]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a0025]"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a0025]"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="courses">Course Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7a0025] resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" bg-[#C21E53] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#C21E53] shadow hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 bg-gradient-to-r from-[#FFE8E8] to-[#FFF4F4] rounded-xl p-6 border-2 border-[#FFCCCC]">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Why Students Choose Us</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-[#7a0025] mr-2" />
                    <span className="text-2xl font-bold text-[#7a0025]">24/7</span>
                  </div>
                  <p className="text-sm text-gray-600">Support Available</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Globe className="h-5 w-5 text-[#7a0025] mr-2" />
                    <span className="text-2xl font-bold text-[#7a0025]">190+</span>
                  </div>
                  <p className="text-sm text-gray-600">Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.3531942224574!2d77.03637017536292!3d28.618603375675642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d051278bda26b%3A0x7ccf2233b69c77ef!2sUnit%20No.%20339%2C%203rd%20Floor%2C%20Tower%20B-3%2C%20Spaze%20IT%20Tech%20Park!5e0!3m2!1sen!2sin!4v1720584694192!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
