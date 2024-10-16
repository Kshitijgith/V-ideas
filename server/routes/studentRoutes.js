// routes/studentRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../models/Student'); // Adjust the path as necessary
const router = express.Router();

// Sign up a new student
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student
        const student = new Student({
            email,
            password: hashedPassword,
        });

        // Save the student to the database
        await student.save();
        res.status(201).json({ message: 'Student registered successfully!' });
        alert("user REgister Succesful");
    } catch (error) {
        res.status(500).json({ error: 'Failed to register student' });
    }
});

// Login a student
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
          alert("invalid Credential");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful!', student });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
