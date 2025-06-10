const Dashboard = require('../models/dashboardModel');

const getUserDashboards = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const dashboards = await Dashboard.getAllByUser(userId);
    return dashboards;
  } catch (error) {
    console.error('Error fetching user dashboards:', error);
    throw error;
  }
};

const createDashboard = async ({ user_id, title, category, content }) => {            // 선택 필드와 타임스탬프에 대한 기본값
  try {
    if (!user_id || !content) {
      throw new Error('Missing required fields: user_id and content');
    }

    const dashboardData = {
      user_id,
      title: title || 'Untitled Dashboard',
      category: category || null,
      content,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await Dashboard.create(dashboardData);
    return result;
  } catch (error) {
    console.error('Error creating dashboard:', error);
    throw error;
  }
};

module.exports = {
  getUserDashboards,
  createDashboard,
};