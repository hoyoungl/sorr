

const createEmail = async ({ user_id, email, subject, content, attachment_url, scheduled_at, status }) => {
  try {
    if (!user_id || !email || !attachment_url || !scheduled_at) {
      throw new Error('Missing required fields: user_id, email, attachment_url, scheduled_at');
    }

    const emailData = {
      user_id,
      email,
      subject: subject || 'No Subject',
      content: content || null,
      attachment_url,
      scheduled_at: new Date(scheduled_at),
      status: status || 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await Email.createEmail(emailData);
    return result;
  } catch (error) {
    console.error('Error in createEmail service:', error);
    throw error;
  }
};

const getEmailById = async (emailId) => {
  try {
    if (!emailId) {
      throw new Error('Email ID is required');
    }
    const email = await Email.getEmailById(emailId);
    if (!email) {
      throw new Error('Email not found');
    }
    return email;
  } catch (error) {
    console.error('Error in getEmailById service:', error);
    throw error;
  }
};

const getEmailsByUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const emails = await Email.getEmailsByUser(userId);
    return emails;
  } catch (error) {
    console.error('Error in getEmailsByUser service:', error);
    throw error;
  }
};

const updateEmail = async (emailId, updateData) => {
  try {
    if (!emailId) {
      throw new Error('Email ID is required');
    }
    const emailData = {
      email: updateData.email || null,
      subject: updateData.subject || null,
      content: updateData.content || null,
      attachment_url: updateData.attachment_url || null,
      scheduled_at: updateData.scheduled_at ? new Date(updateData.scheduled_at) : null,
      sent_at: updateData.sent_at ? new Date(updateData.sent_at) : null,
      status: updateData.status || 'pending',
    };
    const result = await Email.updateEmail(emailId, emailData);
    if (!result) {
      throw new Error('Email not found or no changes made');
    }
    return result;
  } catch (error) {
    console.error('Error in updateEmail service:', error);
    throw error;
  }
};

const deleteEmail = async (emailId) => {
  try {
    if (!emailId) {
      throw new Error('Email ID is required');
    }
    const success = await Email.deleteEmail(emailId);
    if (!success) {
      throw new Error('Email not found or already deleted');
    }
    return { message: 'Email deleted successfully' };
  } catch (error) {
    console.error('Error in deleteEmail service:', error);
    throw error;
  }
};

module.exports = {
  createEmail,
  getEmailById,
  getEmailsByUser,
  updateEmail,
  deleteEmail,
};