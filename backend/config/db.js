const mongoose = require('mongoose');

const connectDB = async () => {
  const dbURI = process.env.MONGO_URI_ATLAS || process.env.MONGO_URI_LOCAL;
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB Protocol: Secured");
  } catch (err) {
    console.error("Database connection failed", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;