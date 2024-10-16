import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import StudentInput from './pages/StudentInput';
import Guide from './pages/Guide';
import Admin from './pages/Admin';
import StudentDashboard from './pages/StudentDashboard';

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const NavLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      className={`text-white px-4 py-2 rounded transition-all duration-300 ease-in-out transform ${
        isHovered ? 'bg-purple-700 scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-purple-100">
        <nav className="bg-purple-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <motion.h1
              className="text-white text-2xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Videas
            </motion.h1>
            <motion.div
              className="space-x-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
  
            </motion.div>
          </div>
        </nav>

        <main className="container mx-auto p-6">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/student" element={<StudentInput />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/studentdashboard" element={<StudentDashboard/>} />
            </Routes>
          </PageTransition>
        </main>
      </div>
    </Router>
  );
};

export default App;