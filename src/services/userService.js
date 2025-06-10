const User = require('../models/userDao');

const createUser = async ({ email, nickname, password, auth_provider }) => {
  try {
    if (!email || !password) {
      throw new Error('Missing required fields: email and password');
    }

    const userData = {
      email,
      nickname: nickname || `User${Date.now()}`, // Default nickname if not provided
      password,
      auth_provider: auth_provider || 'local', // Default to 'local' if not provided
    };

    const result = await User.createUser(userData);
    return result;
  } catch (error) {
    console.error('Error in createUser service:', error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const user = await User.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error in getUserById service:', error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    if (!email) {
      throw new Error('Email is required');
    }
    const user = await User.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error in getUserByEmail service:', error);
    throw error;
  }
};

const updateUser = async (userId, updateData) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const userData = {
      email: updateData.email || null,
      nickname: updateData.nickname || null,
      password: updateData.password || null,
      auth_provider: updateData.auth_provider || null,
      is_active: updateData.is_active !== undefined ? updateData.is_active : true,
    };
    const result = await User.updateUser(userId, userData);
    if (!result) {
      throw new Error('User not found or no changes made');
    }
    return result;
  } catch (error) {
    console.error('Error in updateUser service:', error);
    throw error;
  }
};

const deactivateUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const success = await User.deactivateUser(userId);
    if (!success) {
      throw new Error('User not found or already deactivated');
    }
    return { message: 'User deactivated successfully' };
  } catch (error) {
    console.error('Error in deactivateUser service:', error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deactivateUser,
};