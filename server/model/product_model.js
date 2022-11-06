const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Product = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
});

module.exports = model("Product", Product);
