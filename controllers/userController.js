const User = require("../models/User");

// Create User
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

// Get Users
exports.getUsers = async (req, res) => {
  res.json(await User.find());
};

// LOGIN ⭐
exports.login = async (req, res) => {
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
};