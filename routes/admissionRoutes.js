const router = require("express").Router();
const c = require("../controllers/admissionController");

router.post("/allocate", c.allocate);
router.post("/confirm/:id", c.confirm);
router.patch("/fee/:id", c.updateFee);

module.exports = router;