const Attendance = require('../Models/Attendance');
const Student = require('../Models/Student');

// Get All Attendance for a specific student
const getAllAttendance = async (req, res) => {
    const studentID = req.params.id;
    try {
        const records = await Attendance.find({ studentID });
        res.status(200).json(records);
    } catch (err) {
        console.error("Error fetching all attendance:", err);
        res.status(500).json({ message: "Server error while fetching attendance" });
    }
};

// Get Attendance By Date
// const getAttendanceByDate = async (req, res) => {
//     const studentID = req.params.id;
//     const date = req.params.date;
//     try {
//         const recordsByDate = await Attendance.findOne({
//             studentID,
//             date: date,
//         });
//
//         if (!recordsByDate) {
//             return res.status(404).json({ message: "No attendance record found for this date" });
//         }
//
//         res.status(200).json(recordsByDate);
//     } catch (err) {
//         console.error("Error fetching attendance by date:", err);
//         res.status(500).json({ message: "Server error while fetching attendance" });
//     }
// };
const getAttendanceByDate = async (req, res) => {
    const studentID = req.params.id;
    const date = req.params.date;

    console.log("Searching for:", { studentID, date }); // Debug line 1

    try {
        // First, check if any records exist
        const allRecords = await Attendance.find({});
        console.log("Total records in collection:", allRecords.length); // Debug line 2

        // Check if this specific student has any records
        const studentRecords = await Attendance.find({ studentID });
        console.log("Records for this student:", studentRecords.length); // Debug line 3

        const recordsByDate = await Attendance.findOne({
            studentID,
            date: date,
        });

        console.log("Found record:", recordsByDate); // Debug line 4

        if (!recordsByDate) {
            return res.status(404).json({ message: "No attendance record found for this date" });
        }

        res.status(200).json(recordsByDate);
    } catch (err) {
        console.error("Error fetching attendance by date:", err);
        res.status(500).json({ message: "Server error while fetching attendance" });
    }
};

// Get Attendance Summary
const AttendanceSummary = async (req, res) => {
    const studentID = req.params.id;
    try {
        const totalPresent = await Attendance.countDocuments({ studentID, status: "Present" });
        const totalAbsent = await Attendance.countDocuments({ studentID, status: "Absent" });
        const totalDays = totalAbsent + totalPresent;
        const percentage = totalDays ? ((totalPresent / totalDays) * 100).toFixed(2) : 0;

        res.status(200).json({
            totalPresent,
            totalAbsent,
            totalDays,
            percentage: `${percentage}%`
        });
    } catch (error) {
        console.error("Error fetching attendance summary:", error);
        res.status(500).json({ message: "Server error while fetching summary" });
    }
};

// Get Attendance in Date Range
const AttendanceByRange = async (req, res) => {
    const studentID = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    try {
        const records = await Attendance.find({
            studentID,
            date: {
                $gte: fromDate,
                $lte: toDate
            }
        }).sort({ date: 1 });

        if (records.length === 0) {
            return res.status(404).json({ message: "No attendance records found for this date range" });
        }

        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error while fetching attendance" });
    }
};

module.exports = {
    getAllAttendance,
    getAttendanceByDate,
    AttendanceSummary,
    AttendanceByRange,
};