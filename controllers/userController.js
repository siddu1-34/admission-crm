const User = require("../models/User");

// ➕ CREATE USER
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📄 GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ UPDATE USER (PUT)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔐 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // ❌ User not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // ❌ Wrong password
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    // ✅ Success
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};