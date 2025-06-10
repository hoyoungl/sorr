const pool = mysql.createPool

// 공지사항 생성
async function createNotice(noticeData) {
  const connection = await mysql.createConnection(dbConfig);
  const {
    user_id,
    actor_id,
    type,
    message,
    url,
    channel,
    priority,
    scheduled_at,
  } = noticeData;

  const query = `
    INSERT INTO notice (
      user_id, actor_id, type, message, url, channel, priority, scheduled_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await connection.execute(query, [
    user_id,
    actor_id,
    type,
    message,
    url,
    channel,
    priority,
    scheduled_at,
  ]);

  await connection.end();
  return result.insertId; // 생성된 공지사항 ID 반환
}

// 특정 공지사항 조회 (ID로)
async function getNoticeById(id) {
  const connection = await mysql.createConnection(dbConfig);
  const query = `
    SELECT * FROM notice WHERE id = ? AND is_active = TRUE
  `;
}

// 공지사항 업데이트
async function updateNotice(id, updateData) {
  const connection = await mysql.createConnection(dbConfig);
  const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updateData);
  values.push(id); // WHERE 조건에 사용

  const query = `
    UPDATE notice SET ${fields} WHERE id = ?
  `;

  const [result] = await connection.execute(query, values);
  await connection.end();
  return result.affectedRows; // 업데이트된 행 수 반환
}

// 공지사항 논리적 삭제
async function deleteNotice(id) {
  const connection = await mysql.createConnection(dbConfig);
  const query = `
    UPDATE notice SET is_active = FALSE, deleted_at = NOW() WHERE id = ?
  `;
  const [result] = await connection.execute(query, [id]);
  await connection.end();
  return result.affectedRows; // 삭제된 행 수 반환
}

// 공지사항 읽음 처리
async function markAsRead(id) {
  const connection = await mysql.createConnection(dbConfig);
  const query = `
    UPDATE notice SET is_read = TRUE WHERE id = ?
  `;
  const [result] = await connection.execute(query, [id]);
  await connection.end();
  return result.affectedRows; // 업데이트된 행 수 반환
}

module.exports = {
  createNotice,
  getNoticeById,
  updateNotice,
  deleteNotice
};