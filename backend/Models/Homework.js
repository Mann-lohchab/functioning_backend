
const mongoose = require('mongoose');
//Schema of homework
const homeworkSchema = new mongoose.Schema({
    title: {
        String,
        required: true,
    },
    description: {
        String,
        required: true,
    },
    assignDate: {
        Date: Date,
        type: Date,
        type: Date,
    },
    DueDate: {
        Date: Date,
        type: Date,
        required: true,
    },


});

const Homework = mongoose.model('Homework', homeworkSchema);
module.exports = Homework; // export Homework
