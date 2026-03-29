const mongoose = require("mongoose");

module.exports = mongoose.model("Institution", new mongoose.Schema({
  name: String,
  code: String
}, { timestamps: true }));