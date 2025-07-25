import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import EnrollNow from './pages/EnrollNow';
import AdminDashboard from './admin/AdminDashboard'; 
import AdminCourses from './admin/AdminCourses';





// Main App Component
function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
     
    </Router>
  );
}

// New layout component that controls Header/Footer visibility
const AppLayout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/enroll' || location.pathname === '/admin';


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
       {!hideHeaderFooter && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll" element={<EnrollNow />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />

        </Routes>
        
      </main>

      {!hideHeaderFooter && <Header />}

{!hideHeaderFooter && <Footer />}

    </div>
  );
  
};

export default App;
