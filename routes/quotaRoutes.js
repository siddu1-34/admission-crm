const router = require("express").Router();
const c = require("../controllers/quotaController");

router.post("/", c.create);
router.get("/", c.getAll);

module.exports = router;