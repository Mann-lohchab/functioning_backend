const mongoose = require(`mongoose`);
const express = require(`express`);
const router = express.Router();

const Calendar = require('../Schema/Calendar');

router.get("/", async (req, res) => {
    try {
        const allCalendar = await Calendar.find();
        res.status(200).json(allCalendar);
    } catch (err) {
        console.error('Error fetching calendar data:', err);
        res.status(500).json({ message: 'Server error while fetching calendar data' });
    }
});

module.exports = router;
