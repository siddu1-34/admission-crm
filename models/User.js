const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true }));