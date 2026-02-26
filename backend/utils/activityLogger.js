const Activity = require('../models/Activity');

const logActivity = async (userId, action, details, req = null) => {
  try {
    const ip = req ? (req.headers['x-forwarded-for'] || req.socket.remoteAddress) : null;
    
    await Activity.create({
      user: userId,
      action,
      details,
      ipAddress: ip
    });
    console.log(`[ACTIVITY] ${action}: ${details}`);
  } catch (err) {
    console.error("Activity Log Error:", err);
  }
};

module.exports = logActivity;