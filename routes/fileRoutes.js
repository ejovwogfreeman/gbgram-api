const express = require("express");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

let gfs, gridfsBucket;

const conn = mongoose.connection;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

const router = express.Router();

router.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
