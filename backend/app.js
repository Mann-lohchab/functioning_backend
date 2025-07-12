require('dotenv').config();//this loads up the environment variables
const PORT = 1000;


//CORE MODULES
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


//CONNECTION TO MONGODB
const connectDB = require('./config/database');
connectDB();

//ROUTES
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

// Default Route
app.get('/', (req, res) => {
    res.send(' Student Portal API is running!');
});

// Start Server
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
