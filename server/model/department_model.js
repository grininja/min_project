const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const departmentSchema = new Schema({
  name: { type: String, required: true },
  institute: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("Department", departmentSchema);