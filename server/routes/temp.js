// backend/routes/seed.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const app=express();
// @route   POST /api/seed/admin
// @desc    Create an admin user
// @access  Public (Remove after use)

router.post('/admin', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    // Check if admin already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }

    // Create new admin user
    user = new User({
      name,
      email,
      password,
      role: 'admin',
    });

    await user.save();

    res.status(201).json({
      message: 'Admin created successfully',
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
