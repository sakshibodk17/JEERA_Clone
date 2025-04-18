const express = require("express");
const mongoose= require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/user");
const connectDB = require("./connections");
const User = require("./models/user");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Connect to MongoDB
connectDB();


// Routes
app.use("/api", authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
