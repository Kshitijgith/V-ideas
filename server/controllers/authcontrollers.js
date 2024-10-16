// backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const bcrypt = require('bcryptjs');
dotenv.config();

// Helper function to generate JWT Token
const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * @desc    Admin Login
 * @route   POST /api/auth/admin/login
 * @access  Public
 */
exports.adminLogin = async (req, res) => {
  const { adminEmail, password } = req.body;
  
  // Basic validation
  if (!adminEmail || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check for admin
    const admin = await Admin.findOne({ adminEmail }).select('+password');

    if (!admin) {
        console.log(adminEmail);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const salt = await bcrypt.genSalt(10);
    const password1 = await bcrypt.hash(password, salt);
    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
        console.log(password1);
        console.log(password);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = generateToken(admin._id, 'admin');

    res.status(200).json({
      token,
      user: {
        id: admin._id,
        adminName: admin.adminName,
        adminEmail: admin.adminEmail,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Teacher Login
 * @route   POST /api/auth/teacher/login
 * @access  Public
 */
exports.teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password ) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check for teacher
    const teacher = await Teacher.findOne({ email }).select('+password');

    if (!teacher) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await teacher.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = generateToken(teacher._id, 'teacher');

    res.status(200).json({
      token,
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        qualification: teacher.qualification,
        branch: teacher.branch,
      },
    });
  } catch (error) {
    console.error('Teacher login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Student Login
 * @route   POST /api/auth/student/login
 * @access  Public
 */
exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password ) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check for student
    const student = await Student.findOne({ email }).select('+password');

    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await student.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = generateToken(student._id, 'student');

    res.status(200).json({
      token,
      user: {
        id: student._id,
        studentName: student.studentName,
        email: student.email,
        branch: student.branch,
        div: student.div,
        rollNo: student.rollNo,
      },
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
