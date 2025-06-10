const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/', noticeController.createNotice);
router.get('/:userId', noticeController.getNoticesByUserId);

module.exports = router;