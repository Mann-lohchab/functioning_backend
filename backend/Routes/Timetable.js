const mongoose = require(`mongoose`);
const express = require(`express`);
const router = express.Router();

const Timetable = require('../Schema/Timetable');

router.get("/",async(req,res)=>{
    try{
        const allTimetable = await Timetable.find();
        res.status(200).json(allTimetable)
    }catch(err){
        console.error("error fetching the Timetable data",err);
        res.status(500).json({message:"Server error while fetching Timetable data"})
    }
});
module.exports = router