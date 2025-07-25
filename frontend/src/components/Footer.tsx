import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "/e-learning-app_logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#C21E53] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <img src={logo} alt="E-Knowledge Logo" className="h-20 w-auto mb-4" />
            <p className="text-white/80 max-w-xs">
              eKnowledge – An AICC initiative is an online platform for managing data associated with its tutoring classes in the most efficient and transparent manner.
            </p>
          </div>

          {/* Quick Links */}
          <div className="sm:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Courses", path: "/courses" },
                { name: "Pricing", path: "/pricing" },
                { name: "Blog", path: "/blog" },
                { name: "Contact", path: "/contact" },
                { name: "Buy Now", path: "/enroll" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/80 hover:text-yellow-300 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 mt-1" />
                <a
                  href="mailto:info@aicc.ind.in"
                  className="text-white/80 hover:underline"
                >
                  info@aicc.ind.in
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-orange-300 mt-1" />
                <a
                  href="tel:+919990733308"
                  className="text-white/80 hover:underline"
                >
                  +91-99907 33308
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-300 mt-1" />
                <p className="text-white/80 text-sm leading-relaxed">
                  Unit No. 339, 3rd Floor, <br />
                  Tower B-3, Spaze Itech-Park, <br />
                  Sector-49, Sohna Road, <br />
                  Gurgaon – 122001 (HR), India
                </p>
              </div>
            </div>
          </div>

          {/* App Download Section */}
         {/* App Download Section */}
<div className="flex flex-col items-center bg-white/10 p-5 rounded-lg">
  <h3 className="text-lg font-semibold mb-4 text-white text-center">
    Download App From
  </h3>

  <a
    href="https://play.google.com/store/apps/details?id=co.davos.yuoty"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      alt="Download on Google Play"
      className="h-14 mb-2"
    />
  </a>

  <span className="text-white/60 text-xs my-2 text-center w-full">OR</span>

  <div className="flex flex-col items-center bg-white/10 px-4 py-3 rounded-md">
    <img
      src="/playstore_qr.png"
      alt="QR code to download app"
      className="h-24 w-24 object-contain rounded-md border border-white/30"
    />
    <p className="text-xs text-white/70 mt-2 text-center">
      Scan the QR code to download the app instantly.
    </p>
  </div>
</div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-10 pt-4">
          <p className="text-white/70 text-sm text-center">
            © 2025 All India Chamber of Commerce | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
