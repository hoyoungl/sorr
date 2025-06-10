const mysql = require('mysql2/promise');

async function getAllByUser(userId) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = 'SELECT id, user_id, title, category, content, is_active, created_at, updated_at FROM dashboard WHERE user_id = ? AND is_active = TRUE';
    const [rows] = await connection.execute(query, [userId]);
    return rows;
  } catch (error) {
    console.error('Error fetching dashboards by user:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function create(dashboardData) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = 'INSERT INTO dashboard (user_id, title, category, content, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
      dashboardData.user_id,
      dashboardData.title,
      dashboardData.category,
      dashboardData.content,
      dashboardData.is_active,
      dashboardData.created_at,
      dashboardData.updated_at,
    ];
    const [result] = await connection.execute(query, values);
    return { id: result.insertId, ...dashboardData };
  } catch (error) {
    console.error('Error creating dashboard:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = {
  getAllByUser,
  create,
};