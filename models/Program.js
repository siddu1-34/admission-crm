const mongoose = require("mongoose");

module.exports = mongoose.model("Program", new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  name: String,
  code: String,
  intake: Number,
  academicYear: String,
  courseType: String,
  entryType: String,
  admissionMode: String
}, { timestamps: true }));