const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  ctgry: String,
  price: Number,
  description: String,
  productCode: String,
  photo: String,
});

module.exports = mongoose.model("Product", productSchema);
