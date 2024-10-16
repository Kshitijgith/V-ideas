const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Connect to the database
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const guideRoutes = require('./routes/guideRoutes'); // Route for guides
const cors = require('cors'); // To handle CORS errors

// Load environment variables from .env file
dotenv.config();

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Admin routes
app.use('/api/admin', adminRoutes);

// Student routes
app.use('/api/student', studentRoutes);

// Guide routes
app.use('/api/guide', guideRoutes); // Add guide routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
