// exports.validateLogin = async(req, res, next) => {
//     const { studentID, password } = req.body;
//
//     if (!studentID || !password) {
//         return res.status(400).json({ message: "Student ID and password are required" });
//     }
//
//     next();
// };
// IMPROVED VALIDATION MIDDLEWARE
exports.validateLogin = async (req, res, next) => {
    try {
        console.log("🔍 Validation middleware - Request body:", req.body);

        const { studentID, password } = req.body;

        // Check if required fields are present
        if (!studentID || !password) {
            console.log("❌ Validation failed: Missing required fields");
            return res.status(400).json({
                message: "Student ID and password are required",
                received: { studentID: !!studentID, password: !!password }
            });
        }

        // Check if fields are not empty strings
        if (studentID.trim() === '' || password.trim() === '') {
            console.log("❌ Validation failed: Empty fields");
            return res.status(400).json({
                message: "Student ID and password cannot be empty"
            });
        }

        console.log("✅ Validation passed");
        next();

    } catch (error) {
        console.error("❌ Validation middleware error:", error);
        return res.status(500).json({
            message: "Server error during validation"
        });
    }
};//this above is the debugging code brother for my help cause api testing sucks