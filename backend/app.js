require('dotenv').config();//this loads up the environment variables
const PORT = process.env.PORT || 1000;

//CORE MODULES
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Request logging middleware - MUST BE FIRST
app.use((req, res, next) => {
  console.log(`🌐 Incoming request: ${req.method} ${req.url}`);
  console.log('📦 Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📝 Body:', req.body);
  }
  next();
});

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added to handle URL-encoded data
app.use(cors({
    origin: '*',  // Allow any origin
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
console.log('✅ Static files serving enabled from /public');

//CONNECTION TO MONGODB
console.log('🔄 Attempting MongoDB connection...');
const connectDB = require('./config/database');
connectDB();
console.log('✅ MongoDB connection initiated');

// Monitor MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ MongoDB connection error:', err.message);
});

//ROUTES
console.log('🔄 Loading API routes...');
const StudentAuth = require('./Routes/StudentAuth');
const Attendance = require('./Routes/Attendance');
const Calendar = require('./Routes/Calendar');
const Homework = require('./Routes/Homework');
const Marks = require('./Routes/Marks');
const Notice = require('./Routes/Notice');
const Timetable = require('./Routes/Timetable');

app.use('/api/students', StudentAuth);
app.use('/api/students/Attendance',Attendance);
app.use('/api/students/Calendar',Calendar);
app.use('/api/students/Homework',Homework);
app.use('/api/students/Marks',Marks);
app.use('/api/students/Notice',Notice);
app.use('/api/students/Timetable',Timetable);
console.log('✅ All API routes loaded');

// Default Route - Serve HTML file with logging
app.get('/', (req, res) => {
  console.log('📄 Serving landing page request');
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      console.log('❌ HTML file not found, sending fallback message');
      res.send('Student Portal API is running!');
    } else {
      console.log('✅ HTML file served successfully');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🌐 Public: http://your-server-ip:${PORT}`);
  console.log('📊 Ready to accept requests...');
});
