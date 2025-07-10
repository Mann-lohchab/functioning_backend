const express = require(`express`);
const router = express.Router();

const{
    getFullTimetable,
}=require('../Controller/TimetableController')

//ROUTES

router.get("/:id",getFullTimetable);


module.exports = router