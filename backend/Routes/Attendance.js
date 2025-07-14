const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');

// Import controller functions
const {
    getAllAttendance,
    getAttendanceByDate,
    AttendanceSummary,
    AttendanceByRange
} = require('../Controller/AttendanceController');

// Routes


// ✅ Get attendance by date
router.get("/:id/date/:date",getAttendanceByDate);

// ✅ Get attendance summary
router.get("/:id/summary",  AttendanceSummary);

// ✅ Get attendance in date range
router.get("/:id/range",AttendanceByRange);

// ✅ Get all attendance
router.get("/:id",getAllAttendance);



module.exports = router;
