const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    url = "mongodb://localhost:27017/Clone_db"
    await mongoose.connect(url);
    console.log(`MongoDB connected to ${url}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
};

module.exports = connectDB;
