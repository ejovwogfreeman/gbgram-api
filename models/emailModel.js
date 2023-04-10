const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      username: String,
      email: String,
    },
    email: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", emailSchema);
