const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productImage: [Object],
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
