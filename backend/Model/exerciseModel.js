const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  gifUrl: String,
  targetGender: { type: String, enum: ['male', 'female'], required: true },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
