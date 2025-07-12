const mongoose = require('mongoose');
//Schema of Student
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,

    },
    fathersName: {
        type: String,
        required: true,
    },
    mothersName: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});


// Safe Mode: Prevent OverwriteModelError
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
module.exports = Student;