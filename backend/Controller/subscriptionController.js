const Subscription = require('../model/subscriptionModel');
const Coupon = require('../model/couponModel');
const razorpayInstance = require('../config/config');
const Transaction = require('../model/orderModel');
const User = require('../model/userModel');

const createsubscriptionController = async (req, res) => {
  try {
    console.log("Subscription body:", req.body);
    const sub = new Subscription(req.body);
    await sub.save();
    res.status(201).json({ success: true, subscription: sub });
  } catch (err) {
    console.error("Error creating subscription:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getSubcription = async (req, res) => {
  try {
    const subs = await Subscription.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const createCouponController = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({ success: true, coupon });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const razorPayApiController = async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  try {
    const finalAmount = Math.round(amount * 100);
    const options = {
      amount: finalAmount,
      currency,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ ...order });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating RazorPay order");
  }
};


const saveTransactionController = async (req, res) => {
  try {
    console.log('📦 req.body:', req.body);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      planName,
      amount,
      currency,
      couponCode,
    } = req.body;

    const userId = req.user._id;

    const txn = new Transaction({
      user: userId,
      plan: planId,
      amount: amount,
      planName: planName,
      currency: currency,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      couponCode,
    });

    await txn.save();

    const plan = await Subscription.findById(planId);
    let durationInDays = 30;

    if (plan?.duration?.includes("day")) {
      durationInDays = parseInt(plan.duration);
    } else if (plan?.duration?.includes("month")) {
      durationInDays = parseInt(plan.duration) * 30;
    }

    await User.findByIdAndUpdate(userId, {
      subscriptionTaken: true,
      subscriptionExpiry: new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({ success: true, txn });
  } catch (err) {
    console.error("Error saving transaction:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "name email")
      .populate("plan", "name price duration");

    res.status(200).json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const applyCouponController = async (req, res) => {
  try {
    const { code, amount } = req.body;

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Invalid coupon" });
    }
    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ success: false, message: "Coupon expired" });
    }
    if (amount < coupon.minAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum amount should be ₹${coupon.minAmount} to use this coupon`,
      });
    }

    const discount = (amount * coupon.discountPercent) / 100;
    const newPrice = amount - discount;

    return res.status(200).json({ success: true, newPrice });
  } catch (err) {
    console.error("Error applying coupon:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createsubscriptionController,
  getSubcription,
  getCoupon,
  createCouponController,
  razorPayApiController,
  saveTransactionController,
  getAllTransactions,
  applyCouponController
};
