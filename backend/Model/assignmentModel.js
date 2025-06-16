const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  assignedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WorkoutAssignment", assignmentSchema);