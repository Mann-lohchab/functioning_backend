
const mongoose = require('mongoose');
//Schema of Marks
const markSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',  // refers to Student collection
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    marksObtained: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        default: 100
    },
    examType: {
        type: String,
        enum: ['Midterm', 'Final', 'Class Test', 'Quiz'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Marks = mongoose.model('Marks' , markSchema );
module.exports = Marks;
