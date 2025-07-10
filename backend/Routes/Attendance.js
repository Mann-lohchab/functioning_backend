const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import controller functions
const {
    getAllAttendance,
    getAttendanceByDate,
    attendanceSummary,
    attendanceByDate
} = require('../Controller/AttendanceController');

// Routes

// ✅ Get all attendance
router.get("/:id", auth.requireAuth, getAllAttendance);

// ✅ Get attendance by date
router.get("/:id/date/:date", auth.requireAuth, getAttendanceByDate);

// ✅ Get attendance summary
router.get("/:id/summary", auth.requireAuth, attendanceSummary);

// ✅ Get attendance in date range
router.get("/:id/range", auth.requireAuth, attendanceByDate);

module.exports = router;
