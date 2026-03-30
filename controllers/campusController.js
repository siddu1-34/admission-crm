const Campus = require("../models/Campus");

// CREATE
exports.create = async (req, res) => {
  try {
    const data = await Campus.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Campus.find().populate("institutionId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE (PUT)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Campus.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Campus not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Campus.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Campus not found" });
    }

    res.json({ message: "Campus deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};