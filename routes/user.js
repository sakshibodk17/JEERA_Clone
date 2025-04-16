const express=require("express");
const{ handleGetallUsers,handleGetUserbyId,handleUpdateUserbyID,
    handleDeleteUserbyId,handleCreateNewUser} 
    = require("../controllers/user");

const router=express.Router();

router.route("/").get(handleGetallUsers).post(handleCreateNewUser);

router  
.route("/:id")
.get(handleGetUserbyId)
.patch(handleUpdateUserbyID)
.delete(handleDeleteUserbyId)

 module.exports = router;

