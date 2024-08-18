const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  password: String,
  email: String,
  phone: Number,
});

module.exports = mongoose.model("User", userSchema);
