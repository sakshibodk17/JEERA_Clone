const express = require("express");
const router = express.Router();
const {registerUser, getAllUsers} = require("../controllers/user");

router.post("/register", registerUser);
router.get("/users", getAllUsers);

module.exports = router;
