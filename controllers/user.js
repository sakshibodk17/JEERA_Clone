const User = require("../models/user");

async function registerUser (req, res) {
  try {
    const { FirstName, LastName, Email, Password } = req.body;

    const existingUser= await User.findOne({Email});
    if(existingUser){
      return res.status(400).json({message: "User already exists with this email "});
    }

    const newUser = new User({ FirstName, LastName, Email, Password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!",user: newUser }); 
  } catch (error) {
    res.status(400).json({ message:"Error registering user", error: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-Password");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
}

module.exports={
  registerUser,
  getAllUsers,
};