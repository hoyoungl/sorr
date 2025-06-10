const emailService = require('../services/emailService');

exports.createEmail = async (req, res) => {
  const { user_id, email, subject, content, attachment_url, scheduled_at, status } = req.body;

  if (!user_id || !email || !attachment_url || !scheduled_at) {
    return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
  }

  try {
    const newEmail = await emailService.createEmail({ user_id, email, subject, content, attachment_url, scheduled_at, status });
    res.status(201).json({ message: '이메일 생성 완료', email: newEmail });
  } catch (err) {
    res.status(500).json({ message: '이메일 생성 실패', error: err.message });
  }
};

exports.getEmailById = async (req, res) => {
  try {
    const email = await emailService.getEmailById(req.params.emailId);
    res.json(email);
  } catch (err) {
    res.status(500).json({ message: '이메일 조회 실패', error: err.message });
  }
};

exports.getEmailsByUser = async (req, res) => {
  try {
    const emails = await emailService.getEmailsByUser(req.params.userId);
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: '사용자 이메일 목록 조회 실패', error: err.message });
  }
};

exports.updateEmail = async (req, res) => {
  const { email, subject, content, attachment_url, scheduled_at, sent_at, status } = req.body;

  try {
    const updatedEmail = await emailService.updateEmail(req.params.emailId, {
      email,
      subject,
      content,
      attachment_url,
      scheduled_at,
      sent_at,
      status,
    });
    res.json({ message: '이메일 수정 완료', email: updatedEmail });
  } catch (err) {
    res.status(500).json({ message: '이메일 수정 실패', error: err.message });
  }
};

exports.deleteEmail = async (req, res) => {
  try {
    const result = await emailService.deleteEmail(req.params.emailId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: '이메일 삭제 실패', error: err.message });
  }
};
  