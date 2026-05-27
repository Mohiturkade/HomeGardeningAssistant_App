const express = require("express");
const router = express.Router();
const createUser = require("../controllers/createUser");
const loginUser = require("../controllers/loginUser");
const logoutUser = require("../controllers/logoutUser");


router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
module.exports = router;
