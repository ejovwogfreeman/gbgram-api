const express = require("express");
const { getUsers } = require("../controllers/adminConterollers");
const admin = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/users", admin, getUsers);
module.exports = router;
