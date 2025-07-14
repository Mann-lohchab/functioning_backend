const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
// Import controller functions
const {
    getAllHomework,
    getHomeworkByDate,
    getHomeworkByRange
} = require('../Controller/HomeworkController');

// Routes
router.get("/:id", getAllHomework);
router.get("/:id/date/:date", getHomeworkByDate);
router.get("/:id/range", getHomeworkByRange);

module.exports = router