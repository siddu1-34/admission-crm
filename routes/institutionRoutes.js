const router = require("express").Router();
const c = require("../controllers/institutionController");

router.post("/", c.create);
router.get("/", c.getAll);

module.exports = router;