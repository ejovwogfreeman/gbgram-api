const express = require("express");
const {
  getUser,
  updateUser,
  resetPassword,
  forgotPasword,
} = require("../controllers/userControllers");
const { getUsers } = require("../controllers/adminConteroller");
const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");
const { upload } = require("../middlewares/fileMiddleware");

const router = express.Router();

router.get("/", admin, getUsers);
router.get("/user", protect, getUser);
router.post("/user/forgot_password", forgotPasword);
router.post("/user/reset_password", resetPassword);
router.put("/user/update", protect, upload.array("files"), updateUser);

module.exports = router;
