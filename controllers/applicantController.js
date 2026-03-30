const Applicant = require("../models/Applicant");

// ➕ CREATE
exports.create = async (req, res) => {
  try {
    const data = await Applicant.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📄 GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Applicant.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ UPDATE (PUT)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Applicant.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Applicant.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json({ message: "Applicant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};