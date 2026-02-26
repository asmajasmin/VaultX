const express = require('express');
const router = express.Router();
const { register, login, getMe, changePassword } = require('../controllers/authController'); 
const auth = require('../middleware/authMiddleware');

// --- IDENTITY PROTOCOLS ---
router.post('/register', register); 
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/change-password', auth, changePassword);
router.get('/health', (req, res) => res.send("Vault Node Online"));

module.exports = router;