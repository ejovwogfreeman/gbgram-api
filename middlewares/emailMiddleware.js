const nodemailer = require("nodemailer");
const Email = require("../models/emailModel");
const User = require("../models/userModel");
const fs = require("fs");

const { promisify } = require("util");

const readFile = promisify(fs.readFile);

const email = async (reciever, subject, body) => {
  let transporter = nodemailer.createTransport({
    host: "mail.financialfreedominvestment.co",
    port: 465,
    secure: true,
    auth: {
      user: "mail@financialfreedominvestment.co",
      pass: "ejgift12345#",
    },
  });

  let info = await transporter.sendMail({
    from: '"Financial Freedom Investment" <mail@financialfreedominvestment.co>',
    to: reciever,
    subject: subject,
    html: await readFile(`middlewares/${body}`, "utf8"),
  });

  let user = await User.findOne({ email: reciever });

  const saveEmail = {
    email: info,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  };

  const newEmail = new Email(saveEmail);
  await newEmail.save();
};

module.exports = email;
