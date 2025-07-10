
const express = require(`express`);
const router = express.Router();

const{
    getFullNotice,
    getNoticeByDate
}= require('../Controller/NoticeController')

//ROUTES
router.get("/",auth.requireAuth,getFullNotice);
router.get("/date/:date",auth.requireAuth,getNoticeByDate);
module.exports = router