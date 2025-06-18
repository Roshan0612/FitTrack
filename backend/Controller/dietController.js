const Diet = require("../model/DietModel");
const DietAssignment = require("../model/DietAssignmentModel");

// Create a new diet
const createDiet = async (req, res) => {
  try {
    const { name, category, gifUrl, protein, fat, carbs, calories } = req.body;
    const diet = new Diet({ name, category, gifUrl, protein, fat, carbs,calories });
    await diet.save();
    res.status(201).json(diet);
  } catch (error) {
    res.status(500).json({ error: "Failed to create diet" });
  }
};

// Get diets by category
const getDietsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const diets = await Diet.find({ category });
    res.json(diets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diets" });
  }
};

// Assign or unassign diet
const assignOrUnassignDiet = async (req, res) => {
  try {
    const { userId, dietId } = req.body;
    const existing = await DietAssignment.findOne({ userId, dietId });

    if (existing) {
      await DietAssignment.deleteOne({ _id: existing._id });
      return res.json({ message: "Diet unassigned" });
    } else {
      const assignment = new DietAssignment({ userId, dietId });
      await assignment.save();
      return res.json({ message: "Diet assigned" });
    }
  } catch (error) {
    res.status(500).json({ error: "Assignment error" });
  }
};

// Get assigned diets
const getAssignedDiets = async (req, res) => {
  try {
    const { userId } = req.params;
    const assignments = await DietAssignment.find({ userId }).populate("dietId");
    const diets = assignments.map((a) => a.dietId);
    res.json(diets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assigned diets" });
  }
};

// ✅ Export all controllers
module.exports = {
  createDiet,
  getDietsByCategory,
  assignOrUnassignDiet,
  getAssignedDiets,
};
