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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
  type: String,
  default: '',
  }
,
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  mobile: String,
  address: String,
  fitnessGoal: { type: String, enum: ['maintain', 'mildLoss', 'extremeLoss', 'gain'] },
  activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'veryActive'] },
  medicalConditions: String,
  calorieRecommendation: Number,
  subscriptionTaken: {
    type: Boolean,
    default: false,
  },
  subscriptionExpiry: {
  type: Date,
  }

}, { timestamps: true });


module.exports = mongoose.models.User || mongoose.model("User", userSchema);
