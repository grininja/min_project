const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const departmentItemSchema = new Schema({
  name: { type: String, required: true },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = model("DepartmentItem", departmentItemSchema);
