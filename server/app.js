var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const sellerrouter = require("./routes/sellerRoutes/sellerRoutes");
var logger = require("morgan");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { dburi } = require("./config");
// console.log(dburi);
try {
  mongoose.connect(dburi);
} catch (err) {
  console.log(err);
}

app.use("/seller", sellerrouter);

app.listen(3000, () => {
  console.log("server started");
});
