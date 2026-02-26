const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with your .env credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vault_docs',
    resource_type: 'auto', // Important for PDF/DOCX support
    allowed_formats: ['jpg', 'png', 'pdf', 'docx', 'xlsx', 'txt']
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };