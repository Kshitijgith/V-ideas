<<<<<<< HEAD
// backend/server.js

=======
>>>>>>> 37f66959729987b97e107601d2a2e99e7ec0b395
const express = require('express');
const dotenv = require('dotenv');
<<<<<<< HEAD
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

=======
const connectDB = require('./config/db'); // Connect to the database
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const guideRoutes = require('./routes/guideRoutes'); // Route for guides
const cors = require('cors'); // To handle CORS errors

// Load environment variables from .env file
dotenv.config();

// Initialize express
>>>>>>> 37f66959729987b97e107601d2a2e99e7ec0b395
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());
<<<<<<< HEAD
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));

// Routes

app.use('/auth', require('./routes/authroutes')); // Authentication Routes
app.use('/admin', require('./routes/adminroutes')); // Admin Management Routes
app.use('/teacher', require('./routes/teacherroute')); // Authentication Routes

// Default Route
app.get('/', (req, res) => {
  res.json({ message: 'MERN Auth App Backend' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======

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
>>>>>>> 37f66959729987b97e107601d2a2e99e7ec0b395
