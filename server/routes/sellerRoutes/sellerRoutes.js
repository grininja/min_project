const express=require('express');
const sellerRouter = express.Router();
const productModel = require("../../model/product_model");
const verifySeller = require("../../middlewares/verifyseller");
const Seller=require("../../model/seller_model");
//api to add seller

sellerRouter.post("/addseller", async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body;
    const seller = await new Seller({
      name,
      email,
      password,
    });
    await seller.save();
    res.status(200).json({ message: "seller added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//api to add product
sellerRouter.post("/addproduct", verifySeller, async (req, res) => {
  try {
    const { name, price, description, image, quantity } = req.body;
    const product = new productModel({
      name,
      price,
      description,
      image,
      quantity,
    });
    await product.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error in adding product" });
  }
});

//api to edit product details

sellerRouter.put("/editproduct/:id", verifySeller, async (req, res) => {
  const { name, price, description, image, quantity } = req.body;
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.quantity = quantity;
      await product.save();
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in updating product" });
  }
});

//api to delete product

sellerRouter.delete("/deleteproduct/:id", verifySeller, async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      await product.remove();
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in deleting product" });
  }
});

//api to get all products

sellerRouter.get("/getproductsBySeller", verifySeller, async (req, res) => {
  try {
    const products = await productModel.find({ seller: req.user._id });
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: "Error in getting products" });
  }
});

//api to accept request of selling product

sellerRouter.put("/acceptrequest/:id", verifySeller, async (req, res) => {
  try {
    const request = await AdminReq2.findById(req.params.id);
    if (request) {
      request.status = "Accepted";
      await request.save();
      res.status(200).json({ message: "Request accepted" });
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in accepting request" });
  }
});

//api to reject request of selling product

sellerRouter.put("/rejectrequest/:id", verifySeller, async (req, res) => {
  try {
    const request = await AdminReq2.findById(req.params.id);
    if (request) {
      request.status = "Rejected";
      await request.save();
      res.status(200).json({ message: "Request rejected" });
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in rejecting request" });
  }
});

//api to get all requests

sellerRouter.get("/getrequests", verifySeller, async (req, res) => {
  try {
    const requests = await AdminReq2.find({ seller: req.user._id });
    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ message: "Error in getting requests" });
  }
});

module.exports = sellerRouter;
