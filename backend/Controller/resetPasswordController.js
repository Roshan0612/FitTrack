const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");

const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = resetPasswordController;
