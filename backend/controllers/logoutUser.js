const User = require("../models/Users")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

module.exports = logoutUser;