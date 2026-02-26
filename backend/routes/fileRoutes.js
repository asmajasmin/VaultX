const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const File = require('../models/File');
const { upload } = require('../config/cloudinaryConfig'); 
const logActivity = require('../utils/activityLogger'); // Ensure this file exists!

// --- DIRECT CLOUDINARY IMPORT (Fixes 500 Errors) ---
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- 1. FETCH ALL FILES ---
router.get('/all', auth, async (req, res) => {
  try {
    const files = await File.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, files });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ success: false, msg: 'Vault Retrieval Error' });
  }
});

// --- 2. GLOBAL SEARCH ROUTE (Fixes 404 Error) ---
router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json({ success: true, results: [] });

    const results = await File.find({
      user: req.user.id,
      fileName: { $regex: query, $options: 'i' }
    }).limit(10);

    res.json({ success: true, results });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ success: false, msg: 'Search failed' });
  }
});

// --- 3. ACTIVITY LOGS ROUTE (Fixes 404 Error) ---
router.get('/logs', auth, async (req, res) => {
  try {
    // Lazy load Activity model to avoid circular dependency issues
    const Activity = require('../models/Activity'); 
    const logs = await Activity.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ success: true, logs });
  } catch (err) {
    console.error("Log Fetch Error:", err);
    res.json({ success: true, logs: [] });
  }
});

// --- 4. CREATE FOLDER ---
router.post('/create-folder', auth, async (req, res) => {
  try {
    const { fileName, parentId } = req.body;
    const folder = new File({
      user: req.user.id,
      fileName,
      isFolder: true,
      parentId: parentId || 'root',
      fileUrl: '', 
      publicId: ''
    });
    await folder.save();
    
    // Log Activity
    await logActivity(req.user.id, "CREATE_FOLDER", `Created folder: ${fileName}`);
    
    res.json({ success: true, folder });
  } catch (err) {
    console.error("Create Folder Error:", err);
    res.status(500).json({ success: false, msg: 'Folder creation failed' });
  }
});

// --- 5. UPLOAD FILE ---
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, msg: 'No file provided' });

    const { parentId } = req.body;
    const newFile = new File({
      user: req.user.id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      publicId: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: (req.file.size / 1024 / 1024).toFixed(2) + ' MB',
      parentId: parentId || 'root',
      isFolder: false
    });

    await newFile.save();

    // Log Activity
    await logActivity(req.user.id, "UPLOAD", `Uploaded file: ${newFile.fileName}`);

    res.status(200).json({ success: true, file: newFile });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, msg: 'Cloud Ingestion Failure.' });
  }
});

// --- 6. MOVE FILE ---
router.put('/move/:id', auth, async (req, res) => {
  try {
    const { targetFolderId } = req.body;
    const file = await File.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { parentId: targetFolderId },
      { new: true }
    );
    if (!file) return res.status(404).json({ success: false, msg: 'File not found' });

    // Log Activity
    await logActivity(req.user.id, "MOVE", `Moved file: ${file.fileName}`);

    res.json({ success: true, file });
  } catch (err) {
    console.error("Move Error:", err);
    res.status(500).json({ success: false, msg: 'Move failed' });
  }
});

// --- 7. SAFE DELETE ROUTE (Cascading) ---
router.delete('/:id', auth, async (req, res) => {
  try {
    const target = await File.findOne({ _id: req.params.id, user: req.user.id });
    if (!target) return res.status(404).json({ success: false, msg: 'Item not found.' });

    // Log Activity BEFORE delete
    await logActivity(req.user.id, "DELETE", `Purged item: ${target.fileName}`);

    // A. IF FOLDER: Cascading Delete
    if (target.isFolder) {
      const children = await File.find({ parentId: target._id, user: req.user.id });
      for (const child of children) {
        if (!child.isFolder && child.publicId) {
          try { await cloudinary.uploader.destroy(child.publicId); } 
          catch (e) { console.error("Cloudinary delete error", e); }
        }
        await child.deleteOne();
      }
      await target.deleteOne();
      return res.json({ success: true, msg: 'Folder purged.' });
    }

    // B. IF FILE: Standard Delete
    if (target.publicId) {
      try { await cloudinary.uploader.destroy(target.publicId); } 
      catch (e) { console.error("Cloudinary delete error", e); }
    }
    await target.deleteOne();

    res.json({ success: true, msg: 'File purged.' });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ success: false, msg: 'Server failed to purge item.' });
  }
});

module.exports = router;