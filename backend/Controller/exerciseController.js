const Exercise = require('../model/exerciseModel');
const Assignment = require('../model/assignmentModel');


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


const assignOrUnassignExercise = async (req, res) => {
  const { userId, exerciseId, day, action } = req.body;

  if (!userId || !exerciseId || !day) {
    return res.status(400).json({ message: "Missing userId, exerciseId, or day" });
  }

  try {
    const existing = await Assignment.findOne({ userId, exerciseId, day });

    if (action === "assign") {
      if (existing) {
        return res.status(200).json({ message: "Already assigned for this day" });
      }
      const newAssignment = new Assignment({ userId, exerciseId, day });
      await newAssignment.save();
      return res.status(201).json({ message: "Exercise assigned for day", assignment: newAssignment });
    }

    if (action === "unassign") {
      if (!existing) {
        return res.status(404).json({ message: "No assignment found for this day" });
      }
      await Assignment.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Exercise unassigned for day" });
    }

    
    if (existing) {
      await Assignment.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Exercise unassigned for day (toggle)" });
    } else {
      const newAssignment = new Assignment({ userId, exerciseId, day });
      await newAssignment.save();
      return res.status(201).json({ message: "Exercise assigned for day (toggle)", assignment: newAssignment });
    }

  } catch (error) {
    console.error("Assignment Error:", error);
    res.status(500).json({ message: "Failed to assign/unassign exercise" });
  }
};




const getAssignedExercises = async (req, res) => {
  try {
    const { userId } = req.params;
    const assignments = await Assignment.find({ userId }).populate("exerciseId");

    res.json({ assignments }); 
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
