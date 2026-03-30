const router = require("express").Router();
const c = require("../controllers/userController");

router.post("/", c.createUser);
router.get("/", c.getUsers);

// ✅ ADD THESE
router.put("/:id", c.updateUser);
router.delete("/:id", c.deleteUser);

// LOGIN
router.post("/login", c.login);

module.exports = router;