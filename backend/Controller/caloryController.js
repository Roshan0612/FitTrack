
const calculateCalories = require("../utils/calculateCalories");
const user =require("../model/userModel");
exports.updateUserInfo = async (req, res) => {
  const { age, height, weight, gender, activityLevel, goal } = req.body;

  const calorieRecommendation = calculateCalories({ age, height, weight, gender, activityLevel, goal });

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { age, height, weight, gender, activityLevel, goal, calorieRecommendation },
    { new: true }
  );

  res.status(200).json(updatedUser);
};
