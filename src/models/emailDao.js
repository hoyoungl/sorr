const mysql = require('mysql2/promise');

// 새 이메일 생성 
async function createEmail(emailData) {  
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = `
      INSERT INTO email (user_id, email, subject, content, attachment_url, scheduled_at, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      emailData.user_id,
      emailData.email,
      emailData.subject || null,
      emailData.content || null,
      emailData.attachment_url,
      emailData.scheduled_at,
      emailData.status || 'pending',
      emailData.created_at,
      emailData.updated_at,
    ];
    const [result] = await connection.execute(query, values);
    return { id: result.insertId, ...emailData };
  } catch (error) {
    console.error('Error creating email:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 삭제된 이메일을 제외하고 ID로 이메일을 검색
async function getEmailById(emailId) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = `
      SELECT id, user_id, email, subject, content, attachment_url, scheduled_at, sent_at, status, created_at, updated_at
      FROM email 
      WHERE id = ? AND status != 'deleted'
    `;
    const [rows] = await connection.execute(query, [emailId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching email by ID:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 삭제된 이메일을 제외하고 해당 사용자 모든 이메일 가져오기기
async function getEmailsByUser(userId) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = `
      SELECT id, user_id, email, subject, content, attachment_url, scheduled_at, sent_at, status, created_at, updated_at
      FROM email 
      WHERE user_id = ? AND status != 'deleted'
    `;
    const [rows] = await connection.execute(query, [userId]);
    return rows;
  } catch (error) {
    console.error('Error fetching emails by user:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 업데이트트
async function updateEmail(emailId, updateData) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = `
      UPDATE email 
      SET 
        email = ?, 
        subject = ?, 
        content = ?, 
        attachment_url = ?, 
        scheduled_at = ?, 
        sent_at = ?, 
        status = ?, 
        updated_at = NOW()
      WHERE id = ? AND status != 'deleted'
    `;
    const values = [
      updateData.email,
      updateData.subject || null,
      updateData.content || null,
      updateData.attachment_url,
      updateData.scheduled_at,
      updateData.sent_at || null,
      updateData.status || 'pending',
      emailId,
    ];
    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0 ? { id: emailId, ...updateData } : null;
  } catch (error) {
    console.error('Error updating email:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 삭제제
async function deleteEmail(emailId) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = `UPDATE email SET status = 'deleted', updated_at = NOW() WHERE id = ?`;
    const [result] = await connection.execute(query, [emailId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting email:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = {
  createEmail,
  getEmailById,
  getEmailsByUser,
  updateEmail,
  deleteEmail,
};