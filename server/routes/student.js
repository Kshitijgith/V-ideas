// backend/routes/teacher.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/student/dashboard
// @desc    Student dashboard
// @access  Private/Student
router.get('/dashboard', protect, authorize('student'), (req, res) => {
  res.json({ message: `Welcome to the student dashboard, ${req.user.name}` });
});

module.exports = router;


