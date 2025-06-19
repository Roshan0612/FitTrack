const Exercise = require('../model/exerciseModel');
const Assignment = require('../model/assignmentModel');

// Create new exercise
const createExercise = async (req, res) => {
  try {
    const { name, description, gifUrl, targetGender } = req.body;
    const exercise = new Exercise({ name, description, gifUrl, targetGender });
    await exercise.save();
    res.status(201).json({ message: 'Exercise created successfully', exercise });
  } catch (error) {
    console.error("Create Exercise Error:", error);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
};

// Get exercises by gender
const getExercisesByGender = async (req, res) => {
  try {
    const { gender } = req.params;
    const exercises = await Exercise.find({ targetGender: gender });
    res.json({ exercises });
  } catch (error) {
    console.error("Get Exercises Error:", error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
};

// Assign or Unassign an exercise to a user
const assignOrUnassignExercise = async (req, res) => {
  const { userId, exerciseId } = req.body;

  // Validate input
  if (!userId || !exerciseId) {
    return res.status(400).json({ message: "Missing userId or exerciseId" });
  }

  try {
    // Check if already assigned
    const existing = await Assignment.findOne({ userId, exerciseId });

    if (existing) {
      await Assignment.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Exercise unassigned successfully" });
    } else {
      const newAssignment = new Assignment({ userId, exerciseId });
      await newAssignment.save();
      return res.status(201).json({ message: "Exercise assigned successfully", assignment: newAssignment });
    }
  } catch (error) {
    console.error("Assignment Error:", error);
    res.status(500).json({ message: "Failed to assign/unassign exercise" });
  }
};

// Get assigned exercises for a user
const getAssignedExercises = async (req, res) => {
  try {
    const { userId } = req.params;
    const assignments = await Assignment.find({ userId }).populate("exerciseId");

    res.json({ assignments }); // ✅ not "exercises"
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch assigned exercises" });
  }
};


module.exports = {
  createExercise,
  getExercisesByGender,
  assignOrUnassignExercise,
  getAssignedExercises,
};
