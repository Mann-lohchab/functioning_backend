const mongoose = require(`mongoose`);
const express = require(`express`);
const router = express.Router();

const Homework = require('../Schema/Homework');

router.get("/",async(req,res)=>{
    try{
    const allHomework = await Homework.find();
    res.status(200).json(allHomework)
    }catch(err){
        console.error("error fetching the Homework data",err);
        res.status(500).json({ message: 'Server error while fetching Homework data' });
    }
});
module.exports = router