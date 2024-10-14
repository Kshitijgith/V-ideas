// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { protect, authorize } = require('../middleware/auth');
const app=express();
// @route   POST /api/admin/create-user
// @desc    Admin creates a new user (teacher or student)
// @access  Private/Admin
router.post('/create-user', protect, authorize('admin'), async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
  if (!['teacher', 'student'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User already exists with this email' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
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
