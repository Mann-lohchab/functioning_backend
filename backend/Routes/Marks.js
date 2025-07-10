const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');

// Import controller functions
const {
    getAllSemesterMarks,
    getMarksBySemester
} = require('../Controller/MarksController');

// Routes
router.get("/:id",auth.requireAuth, getAllSemesterMarks);
router.get("/:id/semester/:semester",auth.requireAuth, getMarksBySemester);

module.exports = router;
