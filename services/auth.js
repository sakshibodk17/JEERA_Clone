const User = require("../models/user");

const login = async (email, password) => {
  try {
    console.log("hello sakshi ",email, password);
    
    const user = await User.findOne({ Email: email });
    console.log(user);
    
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect Email or Password");
    }
    const token = jwttoken.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || "Sakshi17"
    );
    return({token, ID: user.Email, Name: user.FirstName})
    
  } catch (error) {
    throw new Error("Error in login: " + error.message);

  }
};

module.exports = { login };
