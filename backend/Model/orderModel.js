const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },plan: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Subscription", // ✅ should match model name exactly
}

,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  couponCode: { type: String, default: null }, 
  planName: String,
  amount: Number,
  currency: String,
  status: {
    type: String,
    default: "captured"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
