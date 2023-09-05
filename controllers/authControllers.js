const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const sendEmail = require("../middlewares/emailMiddleware");
const accessToken = require("../middlewares/accessTokenMiddleware");

/////////////////////////////
////////REGISTER USER////////
/////////////////////////////

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  let hashedPassword = null; // Declare password outside the try block

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt); // Assign the hashed password

    const user = new User({
      username: email.split("@")[0],
      email,
      password: hashedPassword,
    });

    await user.save();

    if (user) {
      const { password, ...others } = user._doc;
      const token = accessToken(user);

      await sendEmail(email, "Welcome On Board", "html/register.html");

      return res.status(200).json({
        ...others,
        token,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
/////////LOGIN USER//////////
/////////////////////////////

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "please fill all fields" });
    } else {
      const user = await User.findOne({ email });
      if (user) {
        const hashedPassword = user.password;
        const comparedPassword = await bcrypt.compare(password, hashedPassword);
        if (comparedPassword === true) {
          const { password, ...others } = user._doc;

          res.status(200).json({
            ...others,
            token: accessToken(user),
          });

          await sendEmail(email, "Login Successful", "html/login.html");
        } else {
          res.status(400).json({ message: "passwords do not match" });
        }
      } else {
        res.status(400).json({ message: "User not found" });
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
