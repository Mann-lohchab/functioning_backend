const student = require('../Models/Student');
const bcrypt = require('bcryptjs');

exports.login = async (req,res)=>{
    const { studentID, password } = req.body;
    if(!studentID||!password){
        return res.status(400).json({ message: "Student ID and Password are required" });
    }
    try{
        //finding the student
        const studentData = await student.findOne({studentID});
        if(!studentData ){
            return res.status(404).json({ message: "Student not found" });
        }
        //comparing the password
        const isMatch = await bcrypt.compare(password,studentData.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //setting the cookie
        res.cookie('student_token', studentData ._id, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: process.env.NODE_ENV === 'development'
        });
        res.status(200).json({
            message: `Welcome ${studentData.firstName} ${studentData.lastName || ''}`.trim(),
            studentID: studentData.studentID
        });

    }catch(err){
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
};
// STUDENT LOGOUT

exports.logout = async (req,res)=>{
    try {
        res.clearCookie('student_token');
        res.status(200).json({message: "Student logged out successfully"});
    }catch(err){
        console.error("Logout Error:", err);
        res.status(500).json({ message: "Server error during logout" });
    }
};
