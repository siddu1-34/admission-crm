const mongoose = require("mongoose");

module.exports = mongoose.model("Quota", new mongoose.Schema({
  programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  quotaType: String,
  totalSeats: Number,
  filledSeats: { type: Number, default: 0 }
}));