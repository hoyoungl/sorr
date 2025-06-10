const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig'); 

const pool = mysql.createPool(dbConfig);


// 공지사항 조회 함수 (ID로 검색)

async function getNoticeById(id) {
  try {
    const [rows] = await pool.execute('SELECT * FROM notice WHERE id = ? AND is_active = TRUE', [id]);
    return rows[0];
  } catch (error) {
    console.error('getNoticeById error:', error);
    throw error;
  }
}

// 공지사항 업데이트 함수
async function updateNotice(id, updateData) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updateData);
    values.push(id);

    const query = `UPDATE notice SET ${fields} WHERE id = ?`;
    const [result] = await connection.execute(query, values);

    return result.affectedRows;
  } catch (err) {
    console.error('updateNotice error:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}     // 예: updateData = { message: '새 메시지', status: 'read' }
      // 결과: query = UPDATE notice SET message = ?, status = ? WHERE id = ?

// 공지사항 삭제 (삭제: deleted_at 업데이트)
async function deleteNotice(id) {
  try {
    const query = `
      UPDATE notice SET is_active = FALSE, deleted_at = NOW() WHERE id = ?
    `;
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows;
  } catch (err) {
    console.error('deleteNotice error:', err);
    throw err;
  }
}

async function markAsRead(id) {
  try {
    const query = `UPDATE notice SET is_read = TRUE WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows;
  } catch (error) {
    console.error('markAsRead error:', error);
    throw error;
  }
}

module.exports ={
    getNoticeById,
    updateNotice,
    deleteNotice,
    markAsRead
};


