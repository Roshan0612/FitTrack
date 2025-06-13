const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  // ✅ Additional fields
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  mobile: String,
  address: String,
  fitnessGoal: String,
  activityLevel: String,
  medicalConditions: String,
  profilePicture: String,
}, { timestamps: true });

// ✅ Fix: Only compile the model if it hasn't been compiled yet
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
