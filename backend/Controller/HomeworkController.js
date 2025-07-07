const Homework = require('../models/Homework');


//Get All HOMEWORK
const getAllHomework = async(req,res)=>{
    const studentID = req.params.id;
    try{
        const records = await Homework.find({studentID})
        res.status(200).json(records)
    }catch(error){
        console.error("Error fetching all Homework:", error)
        res.status(500).json({message:"Server error while fetching Homework"})
    }
};

//Get Homework By Date
const getHomeworkByDate = async(req,res)=>{
    const studentID = req.params.id;
    const date = req.params.date;
    try{
        const recordsByDate = await Homework.find({studentID,date:new Date(date).toDateString() })//here simple find is used cause there can be multiple homework on that day
        if(!recordsByDate){//Teacher never gave  Homework on this day

            return res.status(404).json({ message: "No Homework record found for this date" });

        }res.status(200).json(recordsByDate);
    } catch (error) {
        console.error("Error fetching Homework by date:", error);
        res.status(500).json({ message: "Server error while fetching Homework" });
    }
};

//GET Homework IN DATE RANGE
const HomeworkByDate = async(req,res)=>{
    const studentID = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    try{
        const records = await Homework.find({studentID,date:{$gte:new Date(fromDate),$lte:new Date(toDate)}});
        if (records.length === 0) {
            return res.status(404).json({ message: "No Homework records found for this date range" });
        }
        res.status(200).json(records);
    }catch(error){
        console.err("Error fetching Homework:", error);
        res.status(500).json({ message: "Server error while fetching Homework" });
    }
};