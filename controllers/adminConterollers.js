const User = require("../models/userModel");

/////////////////////////////
////////GET ALL USERS////////
/////////////////////////////
const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

module.exports = {
  getUsers,
};
