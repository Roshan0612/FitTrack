const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },

   day: {
    type: String,
    required: true,
    enum: [
      "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
    ],
  },

});

module.exports = mongoose.model("Assignment", assignmentSchema);
