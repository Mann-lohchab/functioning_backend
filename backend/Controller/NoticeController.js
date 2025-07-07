const Notice = require('../models/Notice');

// GET FULL NOTICE
const getFullNotice = async(req,res)=>{
    const studentID = req.params.id;
    try {
        const fullNotice = await  Notice.find({studentID});
        if (fullNotice.length === 0) {
            res.status(404).json({message:"The Notice was not found"})
        }
        res.status(200).json(fullNotice)
    }catch(error){
        res.status(500).json({message:"There was a sever issue while fetching the Notice",error:err});
    }
};

//GET NOTICE BY DATE

const getNoticeByDate = async(req,res)=>{
    const studentID = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    try{
        const NoticeByDate = await Notice.find({
            studentID,
            date:{$gte:new Date(fromDate),$lte:new Date(toDate)}
        });
        if (NoticeByDate.length === 0) {
            return res.status(404).json({ message: "No Notice records found for this date range" });
        }
        res.status(200).json(NoticeByDate);
    }catch(error){
        res.status(500).json({message:"There was a server error while fetching the Notice"})
    }
};