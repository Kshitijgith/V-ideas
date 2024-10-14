// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
console.log(process.env.MONGO_URI);
console.log(typeof(process.env.MONGO_URI));;
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/login', require('./routes/login'));
app.use('/api/teacher', require('./routes/teacher')); // Example teacher route
app.use('/api/student', require('./routes/student')); // Example student route
app.use('/api/temp', require('./routes/temp'));
// Default route
app.post('/', (req, res) => {
  res.send('MERN Auth App Backend');
});

// Start server
const PORT = process.env.PORT ;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
