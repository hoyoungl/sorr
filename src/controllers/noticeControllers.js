const notices = []; // 임시 저장소 (실제로는 DB 사용)

exports.informNotice = (req, res) => {
  const { user_id, actor_id, type, message, url, channel, priority, scheduled_at } = req.body;

  if (!user_id || !actor_id || !type || !message || !url) {
    return res.status(400).json({ message: '필수 정보가 없습니다.' });
  }

  const notice = {
    id: notices.length + 1,
    user_id,
    actor_id,
    type,
    message,
    url,
    channel: channel || 'default',
    priority: priority || 'normal',
    is_read: false,
    is_active: true,
    scheduled_at: new Date(scheduled_at),
    created_at: new Date(),
  };

  notices.push(notice);

  res.status(201).json({ message: '알림 생성 완료', notice });
};

exports.getNotices = (req, res) => {                       // 특정 알림 
  const userId = parseInt(req.params.user_id);
  if (!userId) return res.status(400).json({ message: '유저 ID 필요' });

  const userNotices = notices.filter(n => n.user_id === userId && n.is_active);
  res.json(userNotices);
};

