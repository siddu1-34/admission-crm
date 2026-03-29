const mongoose = require("mongoose");

module.exports = mongoose.model("Applicant", new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  category: String,
  entryType: String,
  marks: Number,
  documentsStatus: { type: String, default: "Pending" }
}, { timestamps: true }));