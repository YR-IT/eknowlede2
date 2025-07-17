import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="E-Knowledge Logo" className="h-20 w-64" />
            </div>
            <p className="text-white/80 mb-6">
              Empowering learners worldwide with cutting-edge online education
              and professional development courses.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook },
                { Icon: Twitter },
                { Icon: Instagram },
                { Icon: Linkedin },
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
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              Quick Links
            </h3>
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
                    className="text-white/80 hover:text-yellow-300 hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <a
                  href="mailto:info@aicc.ind.in"
                  className="text-white/80 hover:underline"
                >
                  info@aicc.ind.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-300" />
                <a
                  href="tel:+919990733308"
                  className="text-white/80 hover:underline"
                >
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

          <div className="flex flex-col items-center bg-white/5 p-4 rounded-lg">
  <h3 className="text-lg font-semibold mb-4 text-white/90 text-center">
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

  <span className="text-white/60 text-xs my-2">OR</span>

  <div className="flex flex-col items-center bg-white/10 p-2 rounded-md">
    <img
      src="/playstore_qr.png"
      alt="QR code to download app"
      className="h-24 rounded-md border border-white/30"
    />
    <p className="text-xs text-white/70 mt-2 text-center max-w-[150px]">
      Scan the QR code to download the app instantly.
    </p>
  </div>
</div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-4">
          <p className="text-white/70 text-sm text-center">
            Copyright © 2022 All India Chamber of Commerce | All Rights Reserved
            with All India Chamber of Commerce
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
