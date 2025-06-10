const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userModel = require("../Model/userModel");

const forgotPasswordController = async (req, res) => {
  console.log("🔔 Forgot password API hit");

  const { email } = req.body;
  console.log("📧 Email received:", email);

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.warn("⚠️ User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
    const resetLink = `http://localhost:5173/resetpassword/${token}`;
    console.log("🔗 Reset link generated:", resetLink);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    console.log("📬 Sending email to:", email);

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    console.log("✅ Email sent successfully");
    return res.status(200).json({ message: "Reset link sent", resetLink });
  } catch (error) {
    console.error("❌ Error in forgotPasswordController:", error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = forgotPasswordController;
