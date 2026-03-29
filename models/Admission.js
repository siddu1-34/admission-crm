const mongoose = require("mongoose");

module.exports = mongoose.model("Admission", new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant" },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  quotaId: { type: mongoose.Schema.Types.ObjectId, ref: "Quota" },

  admissionNumber: String,
  status: { type: String, default: "Allocated" },
  feeStatus: { type: String, default: "Pending" },

  isLocked: Boolean,
  allotmentNumber: String
}, { timestamps: true }));