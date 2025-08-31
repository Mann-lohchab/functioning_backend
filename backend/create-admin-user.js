const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./Models/Admin');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Portal');
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const createAdminUser = async () => {
    try {
        // Test admin user data
        const adminData = {
            adminID: 'admin001',
            firstName: 'System',
            lastName: 'Administrator',
            email: 'admin@school.com',
            password: 'adminpass123'
        };

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ adminID: adminData.adminID });
        if (existingAdmin) {
            console.log('ℹ️ Admin user already exists:', existingAdmin.adminID);
            return;
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

        // Create new admin
        const newAdmin = new Admin({
            adminID: adminData.adminID,
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            email: adminData.email,
            password: hashedPassword
        });

        // Save to database
        await newAdmin.save();

        console.log('✅ Admin user created successfully!');
        console.log('📋 Admin Details:');
        console.log('   Admin ID:', newAdmin.adminID);
        console.log('   Email:', newAdmin.email);
        console.log('   Password: adminpass123 (hashed in database)');

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
};

// Run the script
const run = async () => {
    await connectDB();
    await createAdminUser();
    await mongoose.connection.close();
    console.log('🔚 Database connection closed');
};

run().catch(console.error);