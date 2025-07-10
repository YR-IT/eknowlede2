import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">E-Knowledge</span>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering learners worldwide with cutting-edge online education and professional development courses.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, color: 'hover:bg-blue-600' },
                { Icon: Twitter, color: 'hover:bg-cyan-600' },
                { Icon: Instagram, color: 'hover:bg-pink-600' },
                { Icon: Linkedin, color: 'hover:bg-blue-700' }
              ].map(({ Icon, color }, index) => (
                <div key={index} className="group">
                  <div className={`p-2 bg-white/10 rounded-full ${color} transition-all duration-300 cursor-pointer group-hover:scale-110`}>
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Courses', 'Pricing', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Popular Courses</h3>
            <ul className="space-y-2">
              {['Web Development', 'Data Science', 'AI & Machine Learning', 'Digital Marketing', 'Cloud Computing'].map((course) => (
                <li key={course}>
                  <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-400">Contact Info</h3>
            <div className="space-y-3">
  <div className="flex items-center space-x-3">
    <Mail className="h-5 w-5 text-cyan-400" />
    <a href="mailto:info@aicc.ind.in" className="text-gray-300 hover:underline">
      info@aicc.ind.in
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <Phone className="h-5 w-5 text-purple-400" />
    <a href="tel:+919990733308" className="text-gray-300 hover:underline">
      +91-99907 33308
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <MapPin className="h-5 w-5 text-pink-400" />
    <a
      href="https://www.google.com/maps/search/?api=1&query=Unit+No.+339,+3rd+Floor,+Tower+B-3,+Spaze+Itech-Park,+Sector-49,+Sohna+Road,+Gurgaon+122001+HR+India"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-gray-100"
    >
      Unit No. 339, 3rd Floor, <br />
      Tower B-3, Spaze Itech-Park <br />
      Sector-49, Sohna Road, <br />
      Gurgaon – 122001 (HR) <br />
      India
    </a>
  </div>
</div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} E-Knowledge. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;