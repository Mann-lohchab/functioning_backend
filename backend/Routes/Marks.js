const express = require('express');
const router = express.Router();

// Import controller functions
const {
    getAllSemesterMarks,
    getMarksBySemester
} = require('../Controller/MarksController');

// Routes
router.get("/:id", getAllSemesterMarks);
router.get("/:id/semester/:semester", getMarksBySemester);

module.exports = router;
