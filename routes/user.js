const express = require("express");
const router = express.Router();
const {registerUser, getAllUsers,loginHandler,
    forgetPassword, resetPassword,deleteUser } = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login",loginHandler);
router.get("/users", getAllUsers);
router.post("/forgotpass",forgetPassword);
router.post("/resetpass",resetPassword);
router.delete("/deleteuser",deleteUser);

module.exports = router;
