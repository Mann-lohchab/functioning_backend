
const express = require(`express`);
const router = express.Router();
const auth = require('../Middleware/auth');

const{
    getFullNotice,
    getNoticeByDate
}= require('../Controller/NoticeController')

//ROUTES
router.get("/:id", getFullNotice);
router.get("/:id/date", getNoticeByDate);
module.exports = router