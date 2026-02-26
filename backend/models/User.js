const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Authorized name required'],
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Secure email required'], 
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Cryptographic key required'],
    minlength: 8,
    select: false 
  },
  tier: { 
    type: String, 
    // FIX: Changed 'Pro' to 'Professional' to match frontend
    enum: ['Personal', 'Professional', 'Enterprise'], 
    default: 'Personal'
  },
  
  billing: {
    cardNumber: { type: String, select: false },
    expiry: { type: String, select: false },
    cvc: { type: String, select: false },
    isPaid: { type: Boolean, default: false }
  },

  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);