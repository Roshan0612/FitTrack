const Exercise = require('../model/exerciseModel');

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

// ✅ Export both at once
module.exports = {
  createExercise,
  getExercisesByGender,
};
