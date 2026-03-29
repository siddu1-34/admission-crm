const router = require("express").Router();
const c = require("../controllers/applicantController");

router.post("/", c.create);
router.get("/", c.getAll);

module.exports = router;