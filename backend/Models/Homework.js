const mongoose = require('mongoose');

// Schema of homework
const homeworkSchema = new mongoose.Schema({
    title: {
        type: String,  // FIXED: Added 'type:' before String
        required: true,
    },
    description: {
        type: String,  // FIXED: Added 'type:' before String
        required: true,
    },
    assignDate: {
        type: Date,    // FIXED: Removed duplicate 'Date: Date,'
        required: true
    },
    dueDate: {     // FIXED: Changed 'DueDate' to 'dueDate' (camelCase)
        type: Date,    // FIXED: Changed from String to Date, removed duplicate 'Date: Date,'
        required: true,
    },
}, {
    timestamps: true  // Optional: adds createdAt and updatedAt automatically
});

// Safe Mode
const Homework = mongoose.models.Homework || mongoose.model('Homework', homeworkSchema);
module.exports = Homework;