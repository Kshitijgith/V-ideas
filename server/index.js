// backend/server.js

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
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
