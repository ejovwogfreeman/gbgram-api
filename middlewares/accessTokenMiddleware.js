const jwt = require("jsonwebtoken");

/////////////////////////////
////////GENERATE JWT/////////
/////////////////////////////
const accessToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = accessToken;
