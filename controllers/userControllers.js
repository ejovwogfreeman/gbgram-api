const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const sendEmail = require("../middlewares/emailMiddleware");
const accessToken = require("../middlewares/accessTokenMiddleware");

/////////////////////////////
//////GET A SINGLE USER//////
/////////////////////////////
const getUser = async (req, res) => {
  let user = await User.findById(req.user._id);
  const { ...others } = user._doc;
  res.send({
    ...others,
    token: accessToken(user),
  });
};

/////////////////////////////
//////////UPDATE USER////////
/////////////////////////////
const updateUser = async (req, res) => {
  const { username } = req.body;

  if (req.files && req.files.length > 0) {
    let filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        fileType: element.mimetype,
        link: `file/${element.filename}`,
      };
      filesArray.push(file);
    });
    await User.findByIdAndUpdate(req.user._id, { profileImage: filesArray });
  }

  if (username && username !== "null") {
    await User.findByIdAndUpdate(req.user._id, { username: username });
  }

  const user = await User.findById(req.user._id);

  const email = user.email;

  await sendEmail(email, "Account Updated", "update.html");

  res.status(200).json({ message: "Profile Updated Successfully" });
};

/////////////////////////////
/////////RESET PASSWORD//////
/////////////////////////////

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  // Find the user in your database using their email address
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found" });
  }

  // Hash the new password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update the user's password in your database
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  if (!updatedUser) {
    return res
      .status(500)
      .json({ error: true, message: "Password update failed" });
  }

  return res.status(200).json({ message: "Password reset is successful" });
};

//////////////////////////////
////////FORGOT PASSWORD///////
//////////////////////////////

const forgotPasword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  // compare the password and send
  if (user) {
    await sendEmail(email, "Password Reset", "reset.html");
    res.status(200).json({ message: "An email has been sent to you" });
  } else {
    res.status(400).json({
      message: "We could not find an account with that email",
      error: true,
    });
  }
};

module.exports = {
  getUser,
  updateUser,
  resetPassword,
  forgotPasword,
};
