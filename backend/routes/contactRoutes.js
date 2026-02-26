const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({ success: true, message: 'Message received successfully!' });

  } catch (error) {
    console.error('Contact Error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;