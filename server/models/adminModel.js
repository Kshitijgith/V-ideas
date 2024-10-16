const mongoose = require('mongoose');

// Admin Schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },  // Admin email must be unique
  password: { type: String, required: true },  // Store hashed password
  role: { type: String, default: 'Admin' },  // Ensure the role is 'Admin'
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
