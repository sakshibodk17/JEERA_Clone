const User = require("../models/user");

async function handleGetallUsers(req, res){
    const alldbUsers= await User.find({});
    return res.json(alldbUsers);
}

async function handleGetUserbyId(req, res) {
        const user= await User.findById(req.params.id);
        if(!user) return res.status(404).json({error:"user not found"});
        return res.json(user);
    
}

async function handleUpdateUserbyID(req, res){
    await User.findByIdAndUpdate(req.params.id, {LastName:"Changed"});
    return res.json({status:"Success"});
}

async function handleDeleteUserbyId(req, res){
    await User.findByIdAndDelete(req. params.id);
    return res.json({status:"Success"});
}

async function handleCreateNewUser(req, res){
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
    const result=await User.create({
        FirstName:body.first_name,
        LastName:body.last_name ,
        Email:body.email,
        JobTitle:body.job_title,
        Gender:body.gender,
    });
    return res.status(201).json({msg:"Success", id: result._id});
} 

module.exports={
    handleGetallUsers,
    handleGetUserbyId,
    handleUpdateUserbyID,
    handleDeleteUserbyId,
    handleCreateNewUser,
}