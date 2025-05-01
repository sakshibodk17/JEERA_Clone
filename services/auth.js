const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwttoken = require("jsonwebtoken");


const login = async ({Email, Password}) => {
  try {
    
    const user = await User.findOne({ Email });
    console.log(user);
    
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      throw new Error("Incorrect Email or Password");
    }
    const token = jwttoken.sign(
      {
        id: user._id,
        email: user.Email,
      },
      process.env.JWT_SECRET || "Sakshi17"
    );
    return {token, ID: user.Email, Name: user.FirstName};
    
  } catch (error) {
    throw new Error("Error in login: " + error.message);

  }
};

module.exports = { login };
