// backend/routes/teacher.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/teacher/dashboard
// @desc    Teacher dashboard
// @access  Private/Teacher
router.get('/dashboard', protect, authorize('teacher'), (req, res) => {
  res.json({ message: `Welcome to the teacher dashboard, ${req.user.name}` });
});

module.exports = router;
