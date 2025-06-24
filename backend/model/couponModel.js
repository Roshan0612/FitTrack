const mongoose =require("mongoose");
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: { type: Number, required: true },
  minAmount: { type: Number },
  expiryDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);