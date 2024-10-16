import React from 'react';
import { useNavigate } from 'react-router-dom';
import student from './StudentDashboard'

const Home = () => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate('/StudentDashBoard'); // Navigate to the Student input page
  };

  const handleGuideClick = () => {
    navigate('/guide'); // Navigate to the Guide page
  };

  const handleAdminClick = () => {
    navigate('/admin'); // Navigate to the Admin page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to Videas</h1>
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleStudentClick}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition"
        >
          Student Login
        </button>
        <button
          onClick={handleGuideClick}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition"
        >
          Guide Login
        </button>
        <button
          onClick={handleAdminClick}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default Home;
