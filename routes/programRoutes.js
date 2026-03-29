const router = require("express").Router();
const c = require("../controllers/programController");

router.post("/", c.create);
router.get("/", c.getAll);

module.exports = router;