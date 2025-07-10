const Homework = require('../models/Homework');

// Get All Homework for a specific student
const getAllHomework = async (req, res) => {
    const studentID = req.params.id;
    try {
        const records = await Homework.find({ studentID });
        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching all Homework:", error);
        res.status(500).json({ message: "Server error while fetching Homework" });
    }
};

// Get Homework By Date
const getHomeworkByDate = async (req, res) => {
    const studentID = req.params.id;
    const date = req.params.date;
    try {
        const recordsByDate = await Homework.find({
            studentID,
            date: new Date(date).toDateString()
        }); // Using find because there can be multiple homework on that day

        if (recordsByDate.length === 0) { // Check array length, not just truthiness
            return res.status(404).json({ message: "No Homework record found for this date" });
        }

        res.status(200).json(recordsByDate);
    } catch (error) {
        console.error("Error fetching Homework by date:", error);
        res.status(500).json({ message: "Server error while fetching Homework" });
    }
};

// Get Homework in Date Range
const getHomeworkByRange = async (req, res) => {
    const studentID = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    if (!fromDate || !toDate) {
        return res.status(400).json({ message: "Both fromDate and toDate are required" });
    }

    try {
        const records = await Homework.find({
            studentID,
            date: {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            }
        });

        if (records.length === 0) {
            return res.status(404).json({ message: "No Homework records found for this date range" });
        }

        res.status(200).json(records);
    } catch (error) {
        console.error("Error fetching Homework:", error);
        res.status(500).json({ message: "Server error while fetching Homework" });
    }
};

module.exports = {
    getAllHomework,
    getHomeworkByDate,
    getHomeworkByRange
};