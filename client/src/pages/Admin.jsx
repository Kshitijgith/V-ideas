import React from 'react';

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <p className="text-lg mb-4">Welcome, Admin! You can manage users here.</p>
      
      {/* Add options for admin actions */}
      <div className="flex flex-col space-y-4">
        <button className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition">
          Add Student
        </button>
        <button className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition">
          Add Guide
        </button>
        <button className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition">
          View All Users
        </button>
      </div>
    </div>
  );
};

export default Admin;
