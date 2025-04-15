const express= require("express");
const fs=require("fs");
const mongoose=require("mongoose");
const { type } = require("os");

const app=express();
const port= 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Mongodb connection 
mongoose.connect("mongodb://127.0.0.1:27017/Sampl_db")
        .then(()=>console.log("Mongodb connected")) //promise
        .catch((err)=>console.log("Mongodb error", err));//handle error

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

    JobTitle:{
        type:String,  
        required:true,
    },

    Gender:{
        type: String,
    },
})

//Model creation 
 const user= mongoose.model("user", userSchema);



 //inserting data in database 

 //check all fields are available

 app.post("/api/users", async(req,res)=>{
    const body=req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title ||
        !body.gender 
    ) {
        return res.status(400).json({msg:"All fields are required"});
    }
    //creating 
   try{
    const result=await user.create({
        FirstName:body.first_name,
        LastName:body.last_name ,
        Email:body.email,
        JobTitle:body.job_title,
        Gender:body.gender,
    });
    console.log("result", result);
    return res.status(201).json({msg:"Success"})
} catch (error) {
    return res.status(500).json({ msg: "Error creating user", error: error.message });
}
 });

 app.get("/api/users/:email",async(req,res)=>{
    const email=req.params.email;

    try{
    const finduser= await user.find({Email: email});
    if(!finduser){
        return res.status(404).json({msg:"user not forund"});
    }
    return res.status(200).json(finduser);
    }catch(error){
        return res.status(500).json({msg:"Server error",error: error.message})
    }
    
 });



app.listen(port, ()=>console.log("Server Started"))