const userModel= require("../model/userModel");

const getAllUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.subscribed === "true") filter.subscriptionTaken = true;
    else if (req.query.subscribed === "false") filter.subscriptionTaken = false;
    
    const users = await userModel.find(filter).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = { getAllUsers, getUserById };