const express = require("express");
const router = express.Router();
const {registerUser, getAllUsers,loginHandler,
    forgetPassword, resetPassword } = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login",loginHandler);
router.get("/users", getAllUsers);
router.post("/forgotpass",forgetPassword);
router.post("/resetpass",resetPassword);

module.exports = router;
