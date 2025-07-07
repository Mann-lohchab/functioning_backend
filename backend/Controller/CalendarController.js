// 1️ Get all calendar events
const getAllCalendarEvents = async (req, res) => {
    try {
        const events = await Calendar.find();
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching calendar events:", err);
        res.status(500).json({ message: "Server error while fetching calendar events" });
    }
};

// 2 Get calendar events by date
const getCalendarByDate = async (req, res) => {
    const date = req.params.date;
    try {
        const events = await Calendar.find({ date: new Date(date).toDateString() });
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
    try {
        const events = await Calendar.find({
            date: { $gte: new Date(fromDate), $lte: new Date(toDate) }
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