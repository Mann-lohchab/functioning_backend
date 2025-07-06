const mongoose = require(`mongoose`);
const express = require(`express`);
const router = express.Router();

const Attendance = require('../Schema/Attendance')

router.get("/",async(req,res)=>{
    try{
        const allAttendance = await Attendance.find();
        res.status(200).json(allAttendance)
    }catch(err){
        res.status(404).json({message:"there has been some error",err})
    }
});
module.exports = router