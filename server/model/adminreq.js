const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const adminReqSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  product_name: { type: String, required: true },
  order_quantity: { type: Number, required: true },
  product_description: { type: String, required: true },

  admin1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  admin2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  admin3: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  admin1approved: {
    type: Boolean,
    default: false,
  },
  admin2approved: {
    type: Boolean,
    default: false,
  },
  admin3approved: {
    type: Boolean,
    default: false,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  institute: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  date_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("AdminReq", adminReqSchema);
