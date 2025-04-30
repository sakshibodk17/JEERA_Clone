const User = require("../models/user");
const bcrypt= require("bcrypt");
const jwttoken=require("jsonwebtoken");
const { login } = require("../services/auth");

async function registerUser (req, res) {
  try {
    const { FirstName, LastName, Email, Password, isVerified} = req.body;
    const existingUser= await User.findOne({Email});
    if(existingUser){
      return res.status(400).json({message: "User already exists with this email "});
    }
    const hashedPassword = await bcrypt.hash(Password, 10); 
    const newUser = new User({ FirstName, LastName, Email, Password:hashedPassword,isVerified });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!",user: newUser }); 
  } catch (error) {
    res.status(400).json({ message:"Error registering user", error: error.message });
  }
}

async function getAllUsers(req, res) { 
  try {
    
    const users = await User.find()
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
}

async function loginHandler(req, res){

  const {Email, Password}= req.body;
  try {
    console.log("In handler",Email
      ,Password
    );
    
  const data = await login({Email, Password},res);
  return res.status(200).json({message:"login successfull"});
    
  } catch (error) {
    console.error( error);
    return res.status(500).json({ message: error.message });
    
    
  }


}

async function forgetPassword(req, res){
   const {Email} = req.body;
  
   try{
    const user= await User.findOne({Email});
    if(!user){
      return res.status(404).json({message:"Email not fount"});
    }
    res.status(200).json({message: "Link send on email"});
   
}catch(error){
  res.status(501).json({message:"Error to forgot pass",error: error.message});
}
}
async function resetPassword(req, res){
  const {Email, newPass} = req.body;
  
   try{
    const user= await User.findOne({Email});
    if(!user){
      return res.status(404).json({message:"Email not fount"});
    }
    user.Password=newPass;
    await user.save();

    res.status(200).json({message:"Password reset successfully"});
   
  }catch(error){
    res.status(501).json({message:"Error to reset pass",error: error.message});
  }
}


module.exports={
  registerUser,
  getAllUsers,
  loginHandler,
  forgetPassword,
  resetPassword,
};  