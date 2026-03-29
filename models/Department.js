const mongoose = require("mongoose");

module.exports = mongoose.model("Department", new mongoose.Schema({
  campusId: { type: mongoose.Schema.Types.ObjectId, ref: "Campus" },
  name: String
}));