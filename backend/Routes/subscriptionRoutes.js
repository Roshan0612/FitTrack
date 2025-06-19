
const express = require('express');
const {createsubscriptionController,getSubcription,
createCouponController ,getCoupon,
razorPayApiController,
saveTransactionController,
getAllTransactions,
applyCouponController} = require("../Controller/subscriptionController");
const { isAdmin, requireSignIn } = require('../Middleware.js/middleware');

const router = express.Router();

router.post('/create-subscription',requireSignIn, isAdmin,createsubscriptionController);


router.get('/subscriptions', getSubcription);


router.post('/create-coupon',createCouponController );


router.get('/coupons', getCoupon);
router.post('/apply-coupon', applyCouponController);

router.post('/create-order',requireSignIn,razorPayApiController);
router.post("/save-transaction", requireSignIn, saveTransactionController);

router.get("/all-transactions", requireSignIn, isAdmin, getAllTransactions);
module.exports = router;
