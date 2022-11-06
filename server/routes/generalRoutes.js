const express = require("express");
const generalRouter = express.Router();
const instituteModel = require("../../model/institute_model");
const userModel = require("../../model/user_model");
const departmentModel = require("../../model/department_model");
generalRouter.post("/addInstitute", async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const intitute = await new instituteModel({
      name,
      email,
      password,
      address,
      phone,
    });
    await intitute.save();
    res.status(200).json({ message: "Institute added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

generalRouter.get("/getInstitutes", async (req, res) => {
  try {
    const institutes = await instituteModel.find();
    res.status(200).json({ institutes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

generalRouter.get("/getDepartments", async (req, res) => {
  try {
    const { instituteid } = req.body;
    const institute = await instituteModel.findById(instituteid);
    const departments = await departmentModel.find({
      _id: { $in: institute.departments },
    });
    res.status(200).json({ departments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

generalRouter.post("/adduser", async (req, res) => {
  try {
    const { name, email, password, institute, department } = req.body;
    const user = await new userModel({
      name,
      email,
      password,
      institute,
      department,
    });
    await user.save();
    res.status(200).json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
