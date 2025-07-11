import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Download } from "lucide-react";
import logo from "../images/e-learning-app-removebg-preview.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const headerClass = isScrolled
    ? "bg-white shadow-md backdrop-blur-md"
    : "bg-white";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="E-Knowledge Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-sm font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 group ${
                    isActive ? "text-orange-600" : "text-gray-800"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-[2px] rounded-full transition-all duration-300 bg-orange-500 ${
                      isActive
                        ? "w-6"
                        : "w-0 group-hover:w-6"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side (Search + CTA) */}
          <div className="hidden md:flex items-center space-x-4">
  {/* <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition hover:scale-110 hover:shadow-sm">
    <Search className="h-5 w-5 text-gray-700 group-hover:animate-pulse" />
  </button> */}

  <a
    href="https://play.google.com/store/apps/details?id=co.davos.yuoty"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-orange-200 hover:scale-105 transform transition-all duration-300 space-x-2">
  <Download className="h-4 w-4" />
  <span>Download App</span>
</button>
  </a>
</div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-base font-semibold uppercase transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
           <a
    href="https://play.google.com/store/apps/details?id=co.davos.yuoty"
    target="_blank"
    rel="noopener noreferrer"
  >
          <button className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-full font-semibold hover:scale-105 transition-transform">
            <Download className="h-4 w-4" />
            Download App
          </button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
