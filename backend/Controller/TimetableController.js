// GET FULL TIMETABLE
const Timetable = require('../models/Timetable');


const getFullTimetable = async(req,res)=>{
    const studentID = req.params.id;
    try {
        const fullTimetable = await  Timetable.find({studentID});
        if (fullTimetable.length === 0) {
            res.status(404).json({message:"The timetable was not found"})
        }
        res.status(200).json(fullTimetable)
    }catch(error){
        res.status(500).json({message:"There was a sever issue while fetching the Timetable",error:error});
    }
}