const mongoose = require(`mongoose`);
const express = require(`express`);
const router = express.Router();

const Notice = require('../Schema/Notice');

router.get("/",async(req,res)=>{
    try{
        const allNotice = await Notice.find();
        res.status(200).json(allNotice)
    }catch(err){
        console.error("error fetching the Notice data",err);
        res.status(500).json({message:"Server error while fetching Notice data"})
    }
});
module.exports = router