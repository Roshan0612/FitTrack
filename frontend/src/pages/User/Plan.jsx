import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import handleSubscribe from './HandleSubscribe';
const API_URL = import.meta.env.VITE_API_URL;

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [auth] = useAuth();
  const [couponCodes, setCouponCodes] = useState({});
  const [discountedPrices, setDiscountedPrices] = useState({});
  const [showCouponField, setShowCouponField] = useState({});

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/subscription/subscriptions`, {
          headers: { Authorization: auth?.token },
        });
        setPlans(res.data);
      } catch (err) {
        console.error("❌ Failed to load plans:", err);
      }
    };
    fetchPlans();
  }, []);

  const applyCoupon = async (planId, planPrice) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/subscription/apply-coupon`, {
        code: couponCodes[planId],
        amount: planPrice,
      });
      const newPrice = res.data.newPrice;
      setDiscountedPrices(prev => ({ ...prev, [planId]: newPrice }));
      setShowCouponField(prev => ({ ...prev, [planId]: false })); // Hide input after applying
    } catch (err) {
      console.error("❌ Invalid coupon or error applying:", err);
      setDiscountedPrices(prev => ({ ...prev, [planId]: planPrice }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-sm text-gray-600">Duration: {plan.duration}</p>
            {discountedPrices[plan._id] && discountedPrices[plan._id] !== plan.price ? (
              <div className="mt-2">
                <p className="text-sm text-gray-500 line-through">₹{plan.price}</p>
                <p className="text-lg font-bold text-green-600">Now: ₹{discountedPrices[plan._id]}</p>
              </div>
            ) : (
              <p className="text-lg font-bold mt-2">₹{plan.price}</p>
            )}
            <p className="text-sm mt-2 text-gray-700">{plan.description}</p>

            {!showCouponField[plan._id] && !discountedPrices[plan._id] ? (
              <button
                className="mt-2 text-sm text-blue-500 underline"
                onClick={() =>
                  setShowCouponField((prev) => ({ ...prev, [plan._id]: true }))
                }
              >
                Do you have a coupon code?
              </button>
            ) : showCouponField[plan._id] && !discountedPrices[plan._id] ? (
              <>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCodes[plan._id] || ''}
                  onChange={(e) =>
                    setCouponCodes(prev => ({ ...prev, [plan._id]: e.target.value }))
                  }
                  className="border p-1 mt-2 w-full rounded"
                />
                <button
                  onClick={() => applyCoupon(plan._id, plan.price)}
                  className="mt-2 text-sm text-blue-500 underline"
                >
                  Apply Coupon
                </button>
              </>
            ) : null}

            <button
              className="mt-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              onClick={() =>
  handleSubscribe(
    plan,
    auth,
    couponCodes[plan._id],
    discountedPrices[plan._id] || plan.price // 👈 use discount if available
  )
}

            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
