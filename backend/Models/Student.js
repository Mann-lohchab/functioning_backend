
const mongoose = require('mongoose');
//Schema of Student
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
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
    section:{
        type:String,
        required:true,
    }
});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student; //export Student
