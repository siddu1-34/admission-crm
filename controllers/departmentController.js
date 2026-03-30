const Department = require("../models/Department");

// ➕ CREATE
exports.create = async (req, res) => {
  try {
    const data = await Department.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📄 GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Department.find().populate({
      path: "campusId",
      select: "name -_id"
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ UPDATE (PUT)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Department.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Department not found" });
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

    const deleted = await Department.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};