const express = require("express");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// router.get("/:fileName", protect, async (req, res) => {
//   gfs.files.findOne({ fiilename: req.params.fileName }, (err, file) => {
//     if (!file || !file.length === 0) {
//       res.status(404).json({
//         err: "No such file exists",
//       });
//     }
//     if (
//       file.contentType === "image/png" ||
//       file.contentType === "image/jpeg" ||
//       file.contentType === "image/jpg" ||
//       file.contentType === "image/webp"
//     ) {
//       const readStream = gfs.createReadStream(file.fileName);
//       readStream.pipe(res);
//     } else {
//       res.status(404).json({
//         err: "Not an image",
//       });
//     }
//   });
// });

router.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
