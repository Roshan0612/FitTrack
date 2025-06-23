const Diet = require("../model/DietModel");
const DietAssignment = require("../model/DietAssignmentModel");


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


const getDietsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const diets = await Diet.find({ category });
    res.json(diets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diets" });
  }
};


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


const getAssignedDiets = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching diets for userId:", userId);

    const assignments = await DietAssignment.find({ userId }).populate("dietId");
    console.log("Assignments found:", assignments);

    const diets = assignments
      .map((a) => {
        if (!a.dietId) {
          console.warn("dietId not populated for assignment:", a);
          return null;
        }
        return a.dietId;
      })
      .filter(Boolean);

    console.log("Diets extracted:", diets);
    res.json(diets);
  } catch (error) {
    console.error("Failed to fetch assigned diets:", error);
    res.status(500).json({ error: "Failed to fetch assigned diets" });
  }
};



module.exports = {
  createDiet,
  getDietsByCategory,
  assignOrUnassignDiet,
  getAssignedDiets,
};
