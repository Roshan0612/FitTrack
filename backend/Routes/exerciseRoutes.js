const express = require('express');
const {
  createExercise,
  getExercisesByGender,
  assignOrUnassignExercise,
  getAssignedExercises,
} = require('../controller/exerciseController');

const router = express.Router();

router.post('/create', createExercise);
router.get('/:gender', getExercisesByGender);
router.post('/assign', assignOrUnassignExercise);
router.get('/assigned/:userId', getAssignedExercises);

module.exports = router;
