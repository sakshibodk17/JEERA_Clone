const express = require("express");
const mongoose= require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv= require("dotenv");
const authRoutes = require("./routes/user");
const connectDB = require("./connections");
const User = require("./models/user");
const cors = require('cors');


const app = express();
app.use(cors); //allow all origin
app.use(express.json());

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
