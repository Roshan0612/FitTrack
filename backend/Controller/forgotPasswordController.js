const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userModel = require("../model/userModel");

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

    
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    
    await transporter.sendMail({
      from: `"FitTrack Support" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 10 minutes.</p>
      `,
    });

    return res.status(200).json({ message: "Reset link sent to email", resetLink });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = forgotPasswordController;
