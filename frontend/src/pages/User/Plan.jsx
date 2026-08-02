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
        console.error("Failed to load plans:", err);
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
      setShowCouponField(prev => ({ ...prev, [planId]: false })); 
    } catch (err) {
      console.error("Invalid coupon or error applying:", err);
      setDiscountedPrices(prev => ({ ...prev, [planId]: planPrice }));
    }
  };

  return (
    <div className="min-h-screen bg-[#05070b] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.34em] text-emerald-300/80">Membership plans</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Available Plans</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/62">Choose a subscription without changing the payment or coupon workflow.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan._id} className="flex h-full flex-col rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="inline-flex items-center self-start rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/75">
              {plan.duration}
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">{plan.name}</h3>
            {discountedPrices[plan._id] && discountedPrices[plan._id] !== plan.price ? (
              <div className="mt-6">
                <p className="text-sm text-white/40 line-through">₹{plan.price}</p>
                <p className="mt-1 text-4xl font-semibold tracking-[-0.05em] text-white">₹{discountedPrices[plan._id]}</p>
              </div>
            ) : (
              <p className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-white">₹{plan.price}</p>
            )}
            <p className="mt-3 min-h-14 text-sm leading-7 text-white/60">{plan.description}</p>

            {!showCouponField[plan._id] && !discountedPrices[plan._id] ? (
              <button
                className="mt-6 flex h-11 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-4 text-sm font-semibold text-white/80 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
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
                  className="mt-2 h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-emerald-400/50"
                />
                <button
                  onClick={() => applyCoupon(plan._id, plan.price)}
                  className="mt-3 flex h-11 w-full items-center justify-center rounded-2xl border border-emerald-300/20 bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-4 text-sm font-semibold !text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(16,185,129,0.24)]"
                >
                  Apply Coupon
                </button>
              </>
            ) : null}

            <button
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/6 px-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              onClick={() =>
  handleSubscribe(
    plan,
    auth,
    couponCodes[plan._id],
    discountedPrices[plan._id] || plan.price 
  )
}

            >
              Choose Plan
            </button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Plan;
