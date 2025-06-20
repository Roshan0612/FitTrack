const express = require('express');
const {
  createExercise,
  getExercisesByGender,
  assignOrUnassignExercise,
  getAssignedExercises,
} = require('../Controller/exerciseController');

const router = express.Router();

router.post('/add', createExercise);
router.post('/assign', assignOrUnassignExercise);
router.get('/assigned/:userId', getAssignedExercises);
router.get('/:gender', getExercisesByGender);

module.exports = router;
