const Program = require("../models/Program");

// ➕ CREATE
exports.create = async (req, res) => {
  try {
    const data = await Program.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📄 GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Program.find().populate({
      path: "departmentId",
      select: "name _id" // ✅ include _id for frontend edit
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

    const updated = await Program.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Program not found" });
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

    const deleted = await Program.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};