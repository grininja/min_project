const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const instituteSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
  },
  admin: {
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
  },
  departments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("Institute", instituteSchema);
