exports.validateLogin = async(req, res, next) => {
    const { studentID, password } = req.body;

    if (!studentID || !password) {
        return res.status(400).json({ message: "Student ID and password are required" });
    }

    next();
};