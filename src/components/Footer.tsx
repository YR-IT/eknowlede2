import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#C21E53] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-300 text-transparent bg-clip-text">E-Knowledge</span>
            </div>
            <p className="text-white/80 mb-6">
              Empowering learners worldwide with cutting-edge online education and professional development courses.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook },
                { Icon: Twitter },
                { Icon: Instagram },
                { Icon: Linkedin }
              ].map(({ Icon }, index) => (
                <div key={index} className="group">
                  <div className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 cursor-pointer group-hover:scale-110">
                    <Icon className="h-5 w-5 text-white group-hover:text-yellow-300 transition-transform duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Courses', 'Pricing', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-white/80 hover:text-yellow-300 hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Popular Courses</h3>
            <ul className="space-y-2">
              {['Web Development', 'Data Science', 'AI & Machine Learning', 'Digital Marketing', 'Cloud Computing'].map((course) => (
                <li key={course}>
                  <a href="#" className="text-white/80 hover:text-yellow-300 hover:translate-x-2 transition-all duration-300 inline-block">
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <a href="mailto:info@aicc.ind.in" className="text-white/80 hover:underline">
                  info@aicc.ind.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-300" />
                <a href="tel:+919990733308" className="text-white/80 hover:underline">
                  +91-99907 33308
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-300" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Unit+No.+339,+3rd+Floor,+Tower+B-3,+Spaze+Itech-Park,+Sector-49,+Sohna+Road,+Gurgaon+122001+HR+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-yellow-300"
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

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} E-Knowledge. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                <a key={i} href="#" className="text-white/80 hover:text-yellow-300 text-sm transition-colors duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
