const noticeService = require('../services/noticeService');

exports.createNotice = async (req, res) => {
  try {
    const noticeData = req.body;

    if (!noticeData.user_id || !noticeData.actor_id || !noticeData.type || !noticeData.message || !noticeData.url || !noticeData.channel || !noticeData.priority || !noticeData.scheduled_at) {
      return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
    }

    await noticeService.createNotice(noticeData);
    res.status(201).json({ message: '알림이 성공적으로 생성되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '알림 생성 중 오류 발생' });
  }
};

exports.getNoticesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const notices = await noticeService.getNoticesByUserId(userId);
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '알림 조회 중 오류 발생' });
  }
};
