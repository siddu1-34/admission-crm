const router = require("express").Router();
const c = require("../controllers/userController");

router.post("/", c.createUser);
router.get("/", c.getUsers);

// LOGIN
router.post("/login", c.login);

module.exports = router;