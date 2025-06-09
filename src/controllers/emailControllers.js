const { emailService } = require("../services");

exports.sendEmail = (req, res) => {
    const { user_id, email, subject, content, scheduled_at } = req.body;
  
    // 간단 유효성 검사
    if (!user_id || !email || !scheduled_at) {     // 중요한 값이 없음
      return res.status(400).json({ message: '필수 정보가 없습니다.' });
    }
  
    // 이메일 예약 데이터 생성
    const emailData = {
      id: emails.length + 1,
      user_id,
      email,
      subject: subject || '',
      content: content || '',
      scheduled_at: new Date(scheduled_at),
      status: 'pending', // 예약 상태
      created_at: new Date(),
      updated_at: new Date(),
    };
  
    emails.push(emailData);
  
    res.status(201).json({ message: '이메일 예약 완료', data: emailData });
  };
  
  