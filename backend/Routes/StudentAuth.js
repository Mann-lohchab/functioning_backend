const express = require('express');
const router = express.Router();
const studentAuthController = require('../Controller/StudentAuthController');
const auth = require('../middleware/auth'); // ← NEW LINE: Import auth middleware

// LOGIN ROUTE
router.post('/login',auth.requireGuest(), studentAuthController.login);
//

// LOGOUT ROUTE
router.post('/logout', auth.requireAuth, studentAuthController.logout);
//

// PROTECTED ROUTE - Profile page (must be logged in)
router.get('/profile', auth.requireAuth, (req, res) => {
//
    res.json({
        message: "Your profile page",
        student: req.student,
        studentId: req.studentId
    });
});

// PROTECTED ROUTE - Dashboard (must be logged in)
router.get('/dashboard', auth.requireAuth, (req, res) => {

    res.json({
        message: `Welcome to dashboard, ${req.student.name}!`,

        studentId: req.studentId
    });
});

module.exports = router;