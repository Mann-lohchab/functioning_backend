const Student = require('../Models/Student');

// Middleware to check if student is authenticated
exports.requireAuth = async (req, res, next) => {
    try {
        // Get the student token from cookies
        const token = req.cookies.student_token;

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                message: "Access denied. Please log in first."
            });
        }

        // Find student in database using the token (which is studentID)
        const student = await Student.findById(token);

        // Check if student exists
        if (!student) {
            return res.status(401).json({
                message: "Invalid session. Please log in again."
            });
        }

        // NEW: Check if session has expired
        if (student.sessionExpiry && student.sessionExpiry < new Date()) {
            // Clear the expired session from database
            await Student.findByIdAndUpdate(student._id, {
                sessionExpiry: null
            });

            // Clear the cookie
            res.clearCookie('student_token');

            return res.status(401).json({
                message: "Session expired. Please log in again."
            });
        }

        // Add student info to request object for use in other routes
        req.student = student;
        req.studentId = student._id;

        // Continue to next middleware or route handler
        next();

    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            message: "Server error during authentication"
        });
    }
};

// Middleware to check if student is already logged in (for login/register routes)
exports.requireGuest = async (req, res, next) => {
    try {
        // Get the student token from cookies
        const token = req.cookies.student_token;

        // If token exists, student is already logged in
        if (token) {
            // NEW: Check if the token is valid and not expired
            const student = await Student.findById(token);

            // If student doesn't exist, token is invalid - continue as guest
            if (!student) {
                res.clearCookie('student_token');
                return next();
            }

            // If session has expired, continue as guest
            if (student.sessionExpiry && student.sessionExpiry < new Date()) {
                // Clear expired session
                await Student.findByIdAndUpdate(student._id, {
                    sessionExpiry: null
                });
                res.clearCookie('student_token');
                return next();
            }

            // If we reach here, student is already logged in with valid session
            return res.status(400).json({
                message: "You are already logged in"
            });
        }

        // Continue to next Middleware (login/register)
        next();

    } catch (error) {
        console.error("Guest middleware error:", error);
        // In case of error, allow to continue as guest
        next();
    }
};