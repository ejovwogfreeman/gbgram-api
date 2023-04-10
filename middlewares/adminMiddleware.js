const jwt = require("jsonwebtoken");

const admin = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = await req.headers.authorization.split(" ")[1];

      let verified = jwt.verify(token, process.env.JWT_SECRET);

      const { password, ...others } = verified.user;
      req.user = { ...others, token };
      if (!req.user.isAdmin) {
        res.status(400).send({ message: "You are not an admin" });
      } else {
        next();
      }
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send({ message: "You are not allowed here" });
  }
};

module.exports = admin;
