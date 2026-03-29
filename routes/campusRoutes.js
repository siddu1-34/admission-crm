const router = require("express").Router();
const c = require("../controllers/campusController");

router.post("/", c.create);
router.get("/", c.getAll);

module.exports = router;