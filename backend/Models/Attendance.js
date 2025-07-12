
const mongoose = require('mongoose');
//Schema of Attendance
const attendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    studentID: {
        type: String,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    totalPresent: {
        type: Number,
        required: true,
    },

});

// Safe Mode: Prevent OverwriteModelError
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance; //export Attendance
