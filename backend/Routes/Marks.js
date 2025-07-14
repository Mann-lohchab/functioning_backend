const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');

// Import controller functions
const {
    getAllSemesterMarks,
     getMarksByExamType
} = require('../Controller/MarksController');

// Routes
router.get("/:id", getAllSemesterMarks);
router.get("/:id/semester/:semester", getMarksByExamType);

module.exports = router;
