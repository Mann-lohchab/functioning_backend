const mongoose = require(`mongoose`);
const express = require(`express`);
const router = express.Router();

const Marks = require('../Schema/Marks');

router.get("/", async (req, res) => {
    try {
        const allMarks = await Marks.find();
        res.status(200).json(allMarks);
    } catch (err) {
        console.error("Error fetching the Marks data", err);
        res.status(500).json({ message: 'Server error while fetching Marks data' });
    }
});

module.exports = router;
