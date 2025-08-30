const Student = require('../Models/Student');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utlis/jwtHelpers');

exports.login = async (req, res) => {
    const { studentID, password } = req.body;

    if (!studentID || !password) {
        return res.status(400).json({ message: "Student ID and Password are required" });
    }
    
    try {
        // Finding the student
        const studentData = await Student.findOne({ studentID });

        if (!studentData) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Comparing the password
        const isMatch = await bcrypt.compare(password, studentData.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Update last login time (removed sessionExpiry as it's not needed with JWT)
        await Student.findByIdAndUpdate(studentData._id, {
            lastLoginAt: new Date()
        });

        // Generate JWT token
        const token = generateToken({
            studentId: studentData._id,
            studentID: studentData.studentID
        });

        // Send response with token
        res.status(200).json({
            message: `Welcome ${studentData.firstName} ${studentData.lastName || ''}`.trim(),
            studentID: studentData.studentID,
            token: token,
            expiresIn: '24h'
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
};

// STUDENT LOGOUT
// With JWT, logout is handled on the client side by removing the token
// However, we can still provide an endpoint for consistency
exports.logout = async (req, res) => {
    try {
        // With JWT, we don't need to do anything server-side
        // The client should remove the token from storage
        
        // Optional: You could maintain a token blacklist here if needed
        // For now, we'll just send a success response
        
        res.status(200).json({ 
            message: "Logged out successfully. Please remove the token from your client storage." 
        });
    } catch (err) {
        console.error("Logout Error:", err);
        res.status(500).json({ message: "Server error during logout" });
    }
};
