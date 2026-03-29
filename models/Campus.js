const mongoose = require("mongoose");

module.exports = mongoose.model("Campus", new mongoose.Schema({
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  name: String
}));