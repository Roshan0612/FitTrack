const express = require("express");
const {
  createDiet,
  getDietsByCategory,
  assignOrUnassignDiet,
  getAssignedDiets,
} = require("../Controller/dietController");

const router = express.Router();

// ✅ Specific routes first
router.post("/add", createDiet);
router.post("/assign", assignOrUnassignDiet);
router.get("/assigned/:userId", getAssignedDiets);

// 🔄 Dynamic route last
router.get("/:category", getDietsByCategory);

module.exports = router;
