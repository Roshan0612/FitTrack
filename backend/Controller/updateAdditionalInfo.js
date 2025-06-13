const User = require("../model/userModel");

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

// ✅ Add this line to export the function
module.exports = { updateAdditionalInfo };
