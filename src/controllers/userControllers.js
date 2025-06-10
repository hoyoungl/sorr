const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  const { email, nickname, password, auth_provider } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
  }

  try {
    const user = await userService.createUser({ email, nickname, password, auth_provider });
    res.status(201).json({ message: '사용자 생성 완료', user });
  } catch (err) {
    res.status(500).json({ message: '사용자 생성 실패', error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: '사용자 조회 실패', error: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.query.email);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: '사용자 조회 실패', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { email, nickname, password, auth_provider, is_active } = req.body;

  try {
    const updatedUser = await userService.updateUser(req.params.userId, {
      email,
      nickname,
      password,
      auth_provider,
      is_active,
    });
    res.json({ message: '사용자 정보 수정 완료', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: '사용자 정보 수정 실패', error: err.message });
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    const result = await userService.deactivateUser(req.params.userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: '사용자 비활성화 실패', error: err.message });
  }
};
