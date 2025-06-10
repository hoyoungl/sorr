const Dashboard = require('../models/dashboardModel');

exports.getUserDashboards = async (req, res) => {
  try {
    const [dashboards] = await Dashboard.getAllByUser(req.params.userId);
    res.json(dashboards);
  } catch (err) {
    res.status(500).json({ message: '서버 오류', error: err });
  }
};

exports.createDashboard = async (req, res) => {            // 새로운 대시보드 항목 생성하기
  const { user_id, title, category, content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
  }

  try {
    await Dashboard.create({ user_id, title, category, content });
    res.status(201).json({ message: '대시보드 생성 완료' });
  } catch (err) {
    res.status(500).json({ message: '생성 실패', error: err });
  }
};