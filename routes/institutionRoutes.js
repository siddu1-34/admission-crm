const express = require("express");
const router = express.Router();
const controller = require("../controllers/institutionController");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.put("/:id", controller.update); // 👈 ADD THIS

module.exports = router;