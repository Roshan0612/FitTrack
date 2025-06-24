const mongoose = require("mongoose");

const dietAssignmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dietId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diet",
    required: true,
  },
});

module.exports = mongoose.model("DietAssignment", dietAssignmentSchema);
