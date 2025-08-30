exports.validateLogin = async (req, res, next) => {
    try {
        const { studentID, password } = req.body;

        // Check if required fields are present
        if (!studentID || !password) {
            return res.status(400).json({
                message: "Student ID and password are required"
            });
        }

        // Check if fields are not empty strings
        if (studentID.trim() === '' || password.trim() === '') {
            return res.status(400).json({
                message: "Student ID and password cannot be empty"
            });
        }

        next();

    } catch (error) {
        console.error("Validation middleware error:", error);
        return res.status(500).json({
            message: "Server error during validation"
        });
    }
};