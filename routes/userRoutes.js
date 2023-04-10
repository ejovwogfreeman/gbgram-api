const express = require("express");
const {
  getUser,
  updateUser,
  changePassword,
  forgotPasword,
  resetPassword,
} = require("../controllers/userControllers");
const protect = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/fileMiddleware");

const router = express.Router();

router.get("/user", protect, getUser);
router.post("/user/change_password", protect, changePassword);
router.post("/user/forgot_password", forgotPasword);
router.post("/user/reset_password", resetPassword);
router.put("/user/update", protect, upload.array("files"), updateUser);

module.exports = router;
