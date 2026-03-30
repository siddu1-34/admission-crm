const Institution = require("../models/Institution");

// Create Institution
exports.create = async (req, res) => {
  try {
    const data = await Institution.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Institutions
exports.getAll = async (req, res) => {
  try {
    const data = await Institution.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Institution.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Institution not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};