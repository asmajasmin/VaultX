const express = require('express');
const router = express.Router();
const { register, login, getMe, changePassword } = require('../controllers/authController'); 
const auth = require('../middleware/authMiddleware');
const User = require('../models/User'); 

router.post('/register', register); 
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/change-password', auth, changePassword);
router.get('/health', (req, res) => res.send("Vault Node Online"));

router.post('/verify-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Identity not found in vault records.' });
    }
    
    res.status(200).json({ success: true, message: 'Identity verified. Proceed to reset.' });
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).json({ success: false, message: 'Server error during verification.' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

   
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ success: true, message: 'Cryptographic key reset successfully.' });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: 'Server error during password reset.' });
  }
});

router.put('/upgrade-plan', auth, async (req, res) => {
  try {
    const { plan } = req.body; 
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.tier = plan; 

    
    if (plan === 'Professional') {
      user.storageLimit = 51200; 
    } else if (plan === 'Enterprise') {
      user.storageLimit = 'Unlimited';
    }

    await user.save();

    res.status(200).json({ 
      success: true, 
      message: `Successfully upgraded to ${plan} plan!` 
    });

  } catch (error) {
    console.error("Upgrade Error:", error);
    res.status(500).json({ success: false, message: 'Server error during upgrade' });
  }
});

module.exports = router;