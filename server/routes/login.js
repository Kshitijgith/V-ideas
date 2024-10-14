// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @route   POST /api/auth/login
// @desc    Login user (teacher or student)
// @access  Public
router.post('/', async (req, res) => {
  const { email, password, role } = req.body;

  // Validate input
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  // Validate role
  if (!['teacher', 'student','admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    // Check for user
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
