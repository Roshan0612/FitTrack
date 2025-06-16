const Exercise = require('../model/exerciseModel');
const Assignment = require('../model/assignmentModel');

const createExercise = async (req, res) => {
  try {
    const { name, description, gifUrl, targetGender } = req.body;
    const exercise = new Exercise({ name, description, gifUrl, targetGender });
    await exercise.save();
    res.status(201).json({ message: 'Exercise created successfully', exercise });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create exercise' });
  }
};

const getExercisesByGender = async (req, res) => {
  try {
    const { gender } = req.params;
    const exercises = await Exercise.find({ targetGender: gender });
    res.json({ exercises });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
};

const assignOrUnassignExercise = async (req, res) => {
  const { userId, exerciseId } = req.body;

  try {
    const existing = await Assignment.findOne({ userId, exerciseId });

    if (existing) {
      await Assignment.deleteOne({ _id: existing._id });
      return res.status(200).json({ message: "Exercise unassigned successfully" });
    } else {
      const newAssignment = new Assignment({ userId, exerciseId });
      await newAssignment.save();
      return res.status(201).json({ message: "Exercise assigned successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to assign/unassign exercise" });
  }
};

const getAssignedExercises = async (req, res) => {
  try {
    const { userId } = req.params;
    const assignments = await Assignment.find({ userId }).populate("exerciseId");

    const assignedExercises = assignments.map((a) => a.exerciseId); // extract full exercise info

    res.json({ exercises: assignedExercises });
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
