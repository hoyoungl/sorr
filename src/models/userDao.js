const mysql = require('mysql2/promise');

// 사용자 생성
async function createUser(userData) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = 'INSERT INTO user (email, nickname, password, auth_provider) VALUES (?, ?, ?, ?)';
    const values = [
      userData.email,
      userData.nickname,
      userData.password,
      userData.auth_provider,
    ];
    const [result] = await connection.execute(query, values);
    return { id: result.insertId, ...userData };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function getUserById(userId) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = 'SELECT * FROM user WHERE id = ? AND is_active = TRUE';
    const [rows] = await connection.execute(query, [userId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function getUserByEmail(email) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = 'SELECT * FROM user WHERE email = ? AND is_active = TRUE';
    const [rows] = await connection.execute(query, [email]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function updateUser(userId, updateData) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = `
      UPDATE user 
      SET 
        email = ?, 
        nickname = ?, 
        password = ?, 
        auth_provider = ?, 
        is_active = ?, 
        updated_at = NOW() 
      WHERE id = ?
    `;
    const values = [
      updateData.email,
      updateData.nickname,
      updateData.password,
      updateData.auth_provider,
      updateData.is_active,
      userId,
    ];
    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0 ? { id: userId, ...updateData } : null;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function deactivateUser(userId) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = 'UPDATE user SET is_active = FALSE, updated_at = NOW() WHERE id = ?';
    const [result] = await connection.execute(query, [userId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deactivateUser,
};