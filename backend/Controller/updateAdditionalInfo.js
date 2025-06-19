const User = require("../model/userModel");
const calculateCalories = require("../utils/calculateCalories");

const updateAdditionalInfo = async (req, res) => {
  const {
    userId,
    age,
    gender,
    height,
    weight,
    mobile,
    address,
    fitnessGoal,
    activityLevel,
    medicalConditions,
    profilePicture,
    
  } = req.body;

  console.log("🔍 Incoming update request:", req.body);
  // ✅ Calculate calories based on goal
  const calorieRecommendation = calculateCalories({
    age,
    gender,
    height,
    weight,
    activityLevel,
    goal: fitnessGoal, // important: match calculateCalories() param
  });

  console.log("🔥 Calculated calories:", calorieRecommendation);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          age,
          gender,
          height,
          weight,
          mobile,
          address,
          fitnessGoal,
          activityLevel,
          medicalConditions,
          profilePicture,
          calorieRecommendation
        },
      },
      { new: true }
    );

    console.log("✅ Updated user:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Additional info saved successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Error updating user info:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating user info",
      error: error.message,
    });
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ Error fetching user info:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching user info",
      error: error.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  const { age, height, weight, gender, activityLevel, goal } = req.body;

  const calorieRecommendation = calculateCalories({ age, height, weight, gender, activityLevel, goal });

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { age, height, weight, gender, activityLevel, goal, calorieRecommendation },
    { new: true }
  );

  res.status(200).json(updatedUser);
};

// ✅ Add this line to export the function
module.exports = { updateAdditionalInfo,getUserInfo,updateUserInfo  };
