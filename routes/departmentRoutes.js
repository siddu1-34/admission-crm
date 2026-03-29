const router = require("express").Router();
const c = require("../controllers/departmentController");

router.post("/", c.create);
router.get("/", c.getAll);

module.exports = router;