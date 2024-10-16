// backend/models/Admin.js
// backend/models/Admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: [true, 'Please add an admin name'],
      trim: true,
    },
    adminEmail: {
      type: String,
      required: [true, 'Please add an admin email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false, // Do not return password by default
    },
  },
  { timestamps: true }
);

// Encrypt password using bcrypt before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Ensure the next middleware is called
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Corrected here
  next();
});

// Method to match entered password with hashed password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Prevent OverwriteModelError
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

module.exports = Admin;

