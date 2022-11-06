const express = require("express");
const admin1Router = express.Router();
const departmentItemSchema = require("../../model/department_item");
const verifyAdmin1 = require("../middlewares/verifyAdmin1");
const adminReqSchema = require("../../model/adminreq");
const { default: mongoose } = require("mongoose");
admin1Router.post("/addItems", verifyAdmin1, async (req, res) => {
  try {
    const { name, department, quantity, description } = req.body;
    const newDepartmentItem = new departmentItemSchema({
      name,
      department,
      quantity,
      description,
    });
    await newDepartmentItem.save();
    res.status(200).json({ message: "Item added successfully" });
  } catch (err) {
    console.log(err);
  }
});

admin1Router.put("/updateItems/:id", verifyAdmin1, async (req, res) => {
  const { name, department, quantity, description } = req.body;
  try {
    const updatedItem = await departmentItemSchema.findByIdAndUpdate(
      req.params.id,
      {
        name,
        department,
        quantity,
        description,
      }
    );
    res.status(200).json({ message: "Item updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

admin1Router.delete("/deleteItem/:id", verifyAdmin1, async (req, res) => {
  try {
    await departmentItemSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

admin1Router.get("/getItems", verifyAdmin1, async (req, res) => {
  try {
    const { department } = req.body;
    const items = await departmentItemSchema.find({ department: department });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

admin1Router.get("/getItems/:id", verifyAdmin1, async (req, res) => {
  try {
    const item = await departmentItemSchema.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});
///api to create order request
admin1Router.post("/requestItems/:id", verifyAdmin1, async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await departmentItemSchema.findById(req.params.id);
    const newAdminReq = new adminReqSchema({
      product: mongoose.Types.ObjectId(req.params.id),
      product_name: item.name,
      order_quantity: quantity,
      product_description: item.description,
      admin1: req.user._id,
      department: item.department,
      institute: req.user.institute,
    });
    await newAdminReq.save();
    res.status(200).json({ message: "Request created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//api to approve request

admin1Router.put("/approveRequest/:id", verifyAdmin1, async (req, res) => {
  try {
    const request = await adminReqSchema.findById(req.params.id);
    if (request.admin1approved) {
      res.status(200).json({ message: "Request already approved" });
    } else {
      request.admin1approved = true;
      await request.save();
      res.status(200).json({ message: "Request approved successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//api to see all requests

admin1Router.get("/getAllRequests", verifyAdmin1, async (req, res) => {
  try {
    const requests = await adminReqSchema.find({ admin1: req.user._id });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err);
  }
});


