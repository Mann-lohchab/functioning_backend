// const Calendar = require('../models/Calendar');
//
// // 1️ Get all calendar events
// const getAllCalendarEvents = async (req, res) => {
//     try {
//         const events = await Calendar.find();
//         res.status(200).json(events);
//     } catch (err) {
//         console.error("Error fetching calendar events:", err);
//         res.status(500).json({ message: "Server error while fetching calendar events" });
//     }
// };
//
// // 2 Get calendar events by date
// const getCalendarByDate = async (req, res) => {
//     const date = req.params.date;
//     try {
//         const events = await Calendar.find({ date: new Date(date).toDateString() });
//         if (events.length === 0) {
//             return res.status(404).json({ message: "No events found for this date" });
//         }
//         res.status(200).json(events);
//     } catch (err) {
//         console.error("Error fetching calendar by date:", err);
//         res.status(500).json({ message: "Server error while fetching calendar" });
//     }
// };
//
// // 3️⃣ Get calendar events in date range
// const getCalendarByRange = async (req, res) => {
//     const fromDate = req.query.fromDate;
//     const toDate = req.query.toDate;
//     try {
//         const events = await Calendar.find({
//             date: { $gte: new Date(fromDate), $lte: new Date(toDate) }
//         });
//         if (events.length === 0) {
//             return res.status(404).json({ message: "No events found in this date range" });
//         }
//         res.status(200).json(events);
//     } catch (err) {
//         console.error("Error fetching calendar by range:", err);
//         res.status(500).json({ message: "Server error while fetching calendar" });
//     }
// };
// module.exports = {
//     getCalendarByRange,
//     getCalendarByDate,
//     getAllCalendarEvents
// };
const Calendar = require('../models/Calendar');

// 1️⃣ Get all calendar events
const getAllCalendarEvents = async (req, res) => {
    try {
        const events = await Calendar.find();
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching calendar events:", err);
        res.status(500).json({ message: "Server error while fetching calendar events" });
    }
};

// 2️⃣ Get calendar events by date
const getCalendarByDate = async (req, res) => {
    const date = req.params.date;

    // ✅ ADDED: Date validation
    if (isNaN(new Date(date))) {
        return res.status(400).json({ message: "Invalid date format" });
    }

    try {
        // ✅ CHANGED: Fixed date comparison - was comparing Date object with string
        // OLD: const events = await Calendar.find({ date: new Date(date).toDateString() });
        const events = await Calendar.find({
            date: {
                $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
                $lt: new Date(new Date(date).setHours(23, 59, 59, 999))
            }
        });

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for this date" });
        }
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching calendar by date:", err);
        res.status(500).json({ message: "Server error while fetching calendar" });
    }
};

// 3️⃣ Get calendar events in date range
const getCalendarByRange = async (req, res) => {
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    // ✅ ADDED: Validation for required parameters
    if (!fromDate || !toDate) {
        return res.status(400).json({ message: "fromDate and toDate are required" });
    }

    // ✅ ADDED: Date validation
    if (isNaN(new Date(fromDate)) || isNaN(new Date(toDate))) {
        return res.status(400).json({ message: "Invalid date format" });
    }

    try {
        // ✅ CHANGED: Enhanced date range query for better accuracy
        // OLD: date: { $gte: new Date(fromDate), $lte: new Date(toDate) }
        const events = await Calendar.find({
            date: {
                $gte: new Date(new Date(fromDate).setHours(0, 0, 0, 0)),
                $lte: new Date(new Date(toDate).setHours(23, 59, 59, 999))
            }
        });

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found in this date range" });
        }
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching calendar by range:", err);
        res.status(500).json({ message: "Server error while fetching calendar" });
    }
};

module.exports = {
    getCalendarByRange,
    getCalendarByDate,
    getAllCalendarEvents
};