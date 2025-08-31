
const Admin = require('../../Models/Admin');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utlis/jwtHelpers');

// 🔥 Login Admin
exports.login = async (req, res) => {
    const adminID = req.body.adminID || req.body.AdminID;
    const password = req.body.password || req.body.Password;

    // 🛑 Validation
    if (!adminID || !password) {
        return res.status(400).json({
            message: "Admin ID and password are required",
            received: { adminID: !!adminID, password: !!password }
        });
    }

    try {
        const admin = await Admin.findOne({ adminID });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Update last login time (removed sessionExpiry as it's not needed with JWT)
        await Admin.findByIdAndUpdate(admin._id, {
            lastLoginAt: new Date()
        });

        // Generate JWT token
        const token = generateToken({
            adminId: admin._id,
            adminID: admin.adminID
        });

        // Send response with token
        res.status(200).json({
            message: `Welcome ${admin.firstName} ${admin.lastName || ''}`.trim(),
            adminID: admin.adminID,
            email: admin.email,
            token: token,
            expiresIn: '24h'
        });
    } catch (err) {
        console.error("Admin Login Error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
};

// 🔥 Logout Admin
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
        console.error("Admin Logout Error:", err);
        res.status(500).json({ message: "Server error during logout" });
    }
};

