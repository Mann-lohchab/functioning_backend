const express = require(`express`);
const router = express.Router();

const{
    getAllCalendarEvents,
    getCalendarByDate,
    getCalendarByRange,
}=require('../Controller/CalendarController')

//ROUTES

router.get("/",getAllCalendarEvents);
router.get("/date/:date",getCalendarByDate);
router.get("/date/range",getCalendarByRange);

module.exports = router;
