const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., "UPLOAD", "DELETE", "LOGIN"
  details: { type: String, required: true }, // e.g., "Uploaded Resume.pdf"
  ipAddress: { type: String }, // Optional: Good for security tracking
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', ActivitySchema);