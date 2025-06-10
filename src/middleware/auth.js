const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // .env에서 JWT_SECRET 불러오기

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // 헤더가 없거나 형식이 잘못된 경우
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>" 중에서 token 부분 추출

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user; // user_id, email 등 payload 내용 저장
    next(); // 다음 미들웨어 또는 컨트롤러로 이동
  });
};

module.exports = authenticateToken;