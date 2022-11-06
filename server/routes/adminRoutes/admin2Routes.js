const express = require("express");
const admin2Router = express.Router();
const verifyAdmin2 = require("../middlewares/verifyAdmin2");
const adminReqSchema = require("../../model/adminreq");
const sellerSchema = require("../../model/seller_model");
const productSchema = require("../../model/product_model");

//get all items which are requested by admin1
admin2Router.get("/getUnapprovedItems", async (req, res) => {
  try {
    const items = await adminReqSchema.find({
      admin1approved: true,
      admin2approved: false,
      institute: req.body.institute,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//api to get all sellers selling the item

admin2Router.get("/getSellers/:id", async (req, res) => {
  try {
    const item = await adminReqSchema.findById(req.params.id);
    //find all products listed with this name
    const products = await productSchema.find({ name: item.name });
    //find all sellers selling these products
    var sellers = [];
    for (let i = 0; i < products.length; i++) {
      const seller = await sellerSchema.findById(products[i].seller);
      sellers.push({ price: products[i].price, seller: seller });
    }
    //sort sellers by price
    sellers.sort((a, b) => {
      return a.price - b.price;
    });
    res.status(200).json(sellers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//api to choose seller for this request
admin2Router.put("/selectSeller/:id", verifyAdmin2, async (req, res) => {
  try {
    const request = await adminReqSchema.findById(req.params.id);
    request.seller = req.body.seller;
    await request.save();
    res.status(200).json({ message: "Seller selected successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//approve request
admin2Router.put("/approveItem/:id", async (req, res) => {
  try {
    await adminReqSchema.findByIdAndUpdate(req.params.id, {
      admin2approved: true,
    });
    res.status(200).json({ message: "Item approved successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//edit request quantity
admin2Router.put("/editQuantity/:id", async (req, res) => {
  try {
    await adminReqSchema.findByIdAndUpdate(req.params.id, {
      order_quantity: req.body.quantity,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete request
admin2Router.delete("/deleteRequest/:id", async (req, res) => {
    try {
        await adminReqSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Request deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
})

//get all approved requests

admin2Router.get("/getApprovedItems", async (req, res) => {
    try{
        const item=await adminReqSchema.find({admin1approved:true,admin2approved:true,institute:req.body.institute});
    }catch(err){
        res.status(500).json(err);
    }
})
