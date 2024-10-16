// models/Student.js
const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        lowercase: true, // Store emails in lowercase
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student; // Export the model
