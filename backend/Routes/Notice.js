
const express = require(`express`);
const router = express.Router();

const{
    getFullNotice,
    getNoticeByDate
}= require('../Controller/NoticeController')

//ROUTES
router.get("/",getFullNotice);
router.get("/date/:date",getNoticeByDate);
module.exports = router