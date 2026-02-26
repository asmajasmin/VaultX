const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logActivity = require('../utils/activityLogger');
const File = require('../models/File');

// --- Identity Registration Protocol ---
// This handles creating a new user and authorizing them instantly
exports.register = async (req, res) => {
  try {
    const { name, email, password, tier, cardData } = req.body;

    // 1. Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        success: false, 
        msg: 'Protocol Error: Identity already exists in the vault.' 
      });
    }

    // 2. Initialize new user
    user = new User({
      name,
      email,
      password,
      tier: tier || 'Personal',
      isVerified: true, // Auto-verify for instant access
    });

    // 3. SECURE BILLING LOGIC
    // If Professional/Enterprise, save card data. 
    // If Personal, we still set isPaid: true but leave card fields empty.
    if (tier !== 'Personal' && cardData) {
      user.billing = {
        cardNumber: cardData.cardNumber,
        expiry: cardData.expiry,
        cvc: cardData.cvc,
        isPaid: true
      };
    } else {
      user.billing = {
        cardNumber: undefined, // Explicitly undefined to avoid schema validation issues
        expiry: undefined,
        cvc: undefined,
        isPaid: true // Free tier is considered "paid" / active
      };
    }

    // 4. Hash Password
    const salt = await bcrypt.genSalt(12); // Using 12 rounds for better security
    user.password = await bcrypt.hash(password, salt);

    // 5. Save User
    await user.save();

    // 6. Log Activity (Optional but recommended)
    try {
      const logActivity = require('../utils/activityLogger');
      await logActivity(user._id, "REGISTER", `New ${user.tier} identity created`);
    } catch (e) {
      console.log("Activity log failed silently");
    }

    res.status(201).json({ 
      success: true, 
      msg: 'Identity created and authorized. You may now sign in.' 
    });

  } catch (err) {
    console.error("Registry Error:", err);
    res.status(500).json({ 
      success: false, 
      msg: err.message || 'System Error: Registry node failure.' 
    });
  }
};


// --- LOGIN CONTROLLER (Updated) ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Locate identity and include encrypted password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, msg: 'Invalid Credentials.' });
    }

    // Validate password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: 'Invalid Credentials.' });
    }

    // LOG ACTIVITY: Successful Login
    // We pass 'req' so the logger can capture the IP address
    await logActivity(user.id, "LOGIN", "User accessed the Sanctum", req);

    // Generate JWT Access Token valid for 8 hours
    const token = jwt.sign(
      { user: { id: user.id, tier: user.tier } },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, msg: 'Login node failure.' });
  }
};

// --- GET CURRENT USER (With Tier-Based Storage Logic) ---
exports.getMe = async (req, res) => {
  try {
    const File = require('../models/File');
    const user = await User.findById(req.user.id).select('-password');
    
    // 1. Calculate Storage Used
    const files = await File.find({ user: req.user.id });
    let totalSizeMB = 0;
    files.forEach(file => { totalSizeMB += parseFloat(file.fileSize) || 0; });

    // 2. Define Tier Logic
    const tier = user.tier || 'Personal'; 
    const planName = tier.toUpperCase() + ' PLAN'; 
    
    // 3. Renewal Date
    const joinDate = new Date(user.createdAt);
    const renewalDate = new Date(joinDate);
    renewalDate.setFullYear(renewalDate.getFullYear() + 1);

    // 4. STORAGE LIMIT LOGIC (The New Part)
    let limitMB = 1024; // Default Personal: 1GB
    let percent = 0;

    if (tier === 'Professional') {
      limitMB = 15360; // 15 GB (15 * 1024)
    } else if (tier === 'Enterprise') {
      limitMB = 'Unlimited'; // Special flag
    }

    // Calculate Percentage (Handle Unlimited case)
    if (limitMB === 'Unlimited') {
      percent = 0; // Bar stays empty or static for unlimited
    } else {
      percent = Math.min((totalSizeMB / limitMB) * 100, 100).toFixed(1);
    }

    res.json({
      success: true,
      user: {
        ...user._doc,
        plan: planName,
        renewalDate: renewalDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      },
      stats: {
        fileCount: files.length,
        storageUsed: totalSizeMB.toFixed(2),
        storageLimit: limitMB,
        storagePercent: percent
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

// --- CHANGE PASSWORD ---
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // 1. Find User (and get the password field which is usually hidden)
    const user = await User.findById(req.user.id).select('+password');
    
    // 2. Check if Current Password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Current password is incorrect.' });
    }

    // 3. Hash New Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();

    // 4. Log Activity
    const logActivity = require('../utils/activityLogger');
    await logActivity(req.user.id, "SECURITY_UPDATE", "User changed password");

    res.json({ success: true, msg: 'Password updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};