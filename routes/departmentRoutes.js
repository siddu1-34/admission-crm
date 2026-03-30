const router = require("express").Router();
const c = require("../controllers/departmentController");

router.post("/", c.create);
router.get("/", c.getAll);

// ✅ ADD THESE
router.put("/:id", c.update);
router.delete("/:id", c.remove);

module.exports = router;