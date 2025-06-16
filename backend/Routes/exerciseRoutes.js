const express = require('express');
const router = express.Router();
const {
  createExercise,
  getExercisesByGender,
} = require('../controller/exerciseController');

// Create new exercise
router.post('/add', createExercise);

// Get exercises by gender
router.get('/:gender', getExercisesByGender);

module.exports = router;
