const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

//Get All Attendance
const getAllAttendance = async(req,res)=>{
    const studentID = req.params.id;
    try{
        const records = await Attendance.find({studentID})
        res.status(200).json(records)
    }catch(err){
        console.err("Error fetching all attendance:", err)
        res.status(500).json({message:"Server error while fetching attendance"})
    }
};

//Get Attendance By Date
const getAttendanceByDate = async(req,res)=>{
    const studentID = req.params.id;
    const date = req.params.date;
    try{
        const recordsByDate = await Attendance.findOne({studentID,date:new Date(date).toDateString() })
        if(!recordsByDate){//Student was on leave and teacher never marked attendance, That date is in the future

            return res.status(404).json({ message: "No attendance record found for this date" });

        }res.status(200).json(recordsByDate);
    } catch (err) {
        console.error("Error fetching attendance by date:", err);
        res.status(500).json({ message: "Server error while fetching attendance" });
    }
};

//Get Attendance Summary
const attendanceSummary = async (req, res) => {
    const studentID = req.params.id;
    try {
        const totalPresent = await Attendance.countDocuments({ studentID, status: "present" });
        const totalAbsent = await Attendance.countDocuments({ studentID, status: "absent" });
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

//GET ATTENDANCE IN DATE RANGE
const attendanceByDate = async(req,res)=>{
    const studentID = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    try{
        const records = await Attendance.find({studentID,date:{$gte:new Date(fromDate),$lte:new Date(toDate)}});
        if (records.length === 0) {
            return res.status(404).json({ message: "No attendance records found for this date range" });
        }
        res.status(200).json(records);
    }catch(error){
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error while fetching attendance" });
    }
};