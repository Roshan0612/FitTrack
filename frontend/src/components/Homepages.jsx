import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { motion } from "framer-motion";
import { useAuth } from "../context/Auth";
import handleSubscribe from "../pages/User/HandleSubscribe";

const API_URL = import.meta.env.VITE_API_URL;

const Homepages = () => {
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
        console.error("❌ Failed to fetch plans", err);
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
      console.error("❌ Invalid coupon or error applying:", err);
      setDiscountedPrices(prev => ({ ...prev, [planId]: planPrice }));
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        id="home"
        className="hero-section flex items-center justify-center text-white text-center h-screen bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dswa5docr/image/upload/v1750357874/pexels-tima-miroshnichenko-5327534_rn9paw.jpg')",
        }}
      >
        <div className="absolute inset-0  bg-opacity-60 z-10"></div>
        <motion.div
          className="relative z-20 p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-500">FitTrack</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">Your fitness journey starts here</p>
          <a
            href="/auth/signup"
            className="bg-blue-600 px-6 py-3 text-white rounded hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </motion.div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="plans-section p-6  text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Available Plans</h2>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan._id} className=" plan-card border rounded p-4 shadow">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-sm -600">Duration: {plan.duration}</p>
              {discountedPrices[plan._id] && discountedPrices[plan._id] !== plan.price ? (
                <div className="mt-2">
                  <p className="text-sm text-white-500 line-through">₹{plan.price}</p>
                  <p className="text-lg font-bold text-green-600">Now: ₹{discountedPrices[plan._id]}</p>
                </div>
              ) : (
                <p className="text-lg font-bold mt-2">₹{plan.price}</p>
              )}
              <p className="text-sm mt-2 text-white-700">{plan.description}</p>

              {!showCouponField[plan._id] && !discountedPrices[plan._id] ? (
                <button
                  className="mt-2 text-sm text-blue-500 underline"
                  onClick={() => setShowCouponField((prev) => ({ ...prev, [plan._id]: true }))}
                >
                  Do you have a coupon code?
                </button>
              ) : showCouponField[plan._id] && !discountedPrices[plan._id] ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCodes[plan._id] || ''}
                    onChange={(e) => setCouponCodes(prev => ({ ...prev, [plan._id]: e.target.value }))}
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
                onClick={() => handleSubscribe(
                  plan,
                  auth,
                  couponCodes[plan._id],
                  discountedPrices[plan._id] || plan.price
                )}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section py-16 px-6 bg-gray-100">
        <h2 className="about-title text-3xl font-bold text-center mb-6">About FitTrack</h2>
        <p className="about-subtitle text-center text-lg text-gray-600 mb-12">
          Smarter Fitness Starts Here
        </p>

        <div className="about-grid grid gap-8 max-w-6xl mx-auto md:grid-cols-3">
          <div className="about-card bg-white p-6 rounded shadow text-left">
            <h3 className="text-xl font-semibold mb-2">🏋 Who We Are</h3>
            <p>
              FitTrack is a modern gym management system designed to help gym owners,
              trainers, and members stay connected. Whether you're managing clients or
              tracking your progress — we’ve got you covered.
            </p>
          </div>

          <div className="about-card bg-white p-6 rounded shadow text-left">
            <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
            <p>
              We empower people to lead healthier lives by simplifying fitness routines,
              diet planning, and progress monitoring — all in one seamless platform.
            </p>
          </div>

          <div className="about-card bg-white p-6 rounded shadow text-left">
            <h3 className="text-xl font-semibold mb-2">🚀 Why FitTrack?</h3>
            <ul className="list-disc pl-5">
              <li>✔ Personalized Workouts & Diets</li>
              <li>✔ Admin Panel for Trainers</li>
              <li>✔ Easy Subscription Management</li>
              <li>✔ Calorie & Nutrition Tools</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">FitTrack</h3>
            <p className="text-sm text-gray-400">
              Your fitness journey simplified with personalized workouts, diet plans, and
              progress tracking.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#plans" className="hover:underline">Plans</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="/auth/login" className="hover:underline">Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Homepages;
