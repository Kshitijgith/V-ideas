import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-6 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
    <p className="text-gray-600 mb-2">{project.description}</p>
    <div className="flex justify-between text-sm text-gray-500">
      <span>Created by: {project.createdBy}</span>
      <span>Guide: {project.guide}</span>
      <span>Status: {project.status}</span>
    </div>
  </motion.div>
);

export default function StudentDashboard() {
  const [allProjects, setAllProjects] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [studentProfile, setStudentProfile] = useState(null);

  useEffect(() => {
    // Simulated API call to fetch student profile
    const fetchStudentProfile = async () => {
      const profile = {
        name: 'John Doe',
        id: 'S12345',
        department: 'Computer Science',
        year: '3rd Year',
        email: 'john.doe@example.com',
        projects: [
          { id: 1, title: 'AI Chatbot', description: 'Developing an AI-powered chatbot', guide: 'Dr. Smith', status: 'In Progress' },
          { id: 4, title: 'Blockchain Application', description: 'Developing a decentralized application using blockchain', guide: 'Prof. Brown', status: 'In Progress' },
        ]
      };
      setStudentProfile(profile);
    };

    // Simulated API call to fetch all projects
    const fetchAllProjects = async () => {
      const data = [
        { id: 1, title: 'AI Chatbot', description: 'Developing an AI-powered chatbot', createdBy: 'John Doe', guide: 'Dr. Smith', status: 'In Progress' },
        { id: 2, title: 'Smart Home System', description: 'Creating a IoT-based smart home system', createdBy: 'Jane Smith', guide: 'Prof. Johnson', status: 'Pending Approval' },
        { id: 3, title: 'Data Visualization Tool', description: 'Building a tool for complex data visualization', createdBy: 'Mike Johnson', guide: 'Dr. Williams', status: 'Approved' },
        { id: 4, title: 'Blockchain Application', description: 'Developing a decentralized application using blockchain', createdBy: 'John Doe', guide: 'Prof. Brown', status: 'In Progress' },
        { id: 5, title: 'Machine Learning Model', description: 'Creating a predictive model using machine learning', createdBy: 'Emily Brown', guide: 'Dr. Davis', status: 'Approved' },
      ];
      setAllProjects(data);
    };

    fetchStudentProfile();
    fetchAllProjects();
  }, []);

  const sortedProjects = [...allProjects].sort((a, b) => {
    if (sortBy === 'guide') {
      return a.guide.localeCompare(b.guide);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    } else if (sortBy === 'createdBy') {
      return a.createdBy.localeCompare(b.createdBy);
    }
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1
        className="text-3xl font-bold mb-6 text-purple-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Student Dashboard
      </motion.h1>

      {studentProfile && (
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Your Profile</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <p><span className="font-semibold">Name:</span> {studentProfile.name}</p>
            <p><span className="font-semibold">Student ID:</span> {studentProfile.id}</p>
            <p><span className="font-semibold">Department:</span> {studentProfile.department}</p>
            <p><span className="font-semibold">Year:</span> {studentProfile.year}</p>
            <p><span className="font-semibold">Email:</span> {studentProfile.email}</p>
          </div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Your Projects</h3>
          {studentProfile.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">All Projects</h2>
        <div className="flex justify-end mb-4">
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="guide">Guide</option>
            <option value="status">Status</option>
            <option value="createdBy">Created By</option>
          </select>
        </div>
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
}