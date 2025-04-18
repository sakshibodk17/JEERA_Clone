const mongoose= require("mongoose");
const userMiddleware = require("../middleware/index");

//Schema 
const userSchema= new mongoose.Schema({
    FirstName:{
        type: String,
        required: true,
    },

    LastName:{
        type: String,
    },

    Email:{
        type:String,
        required:true,
        unique: true,
    },

    Password:{
        type:String,  
        required:true,
    },

  isVerified:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
});

userMiddleware(userSchema);
//Model creation 
 const User= mongoose.model("user", userSchema);

 module.exports= User;