// Homepages.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { motion } from "framer-motion";
import { useAuth } from "../context/Auth";
import handleSubscribe from '../pages/User/HandleSubscribe'
const API_URL = import.meta.env.VITE_API_URL;

const Homepages = () => {
  const [plans, setPlans] = useState([]);
  const [auth] = useAuth(); 
   const [couponCodes, setCouponCodes] = useState({});
   const [discountedPrices, setDiscountedPrices] = useState({});
   const [showCouponField, setShowCouponField] = useState({});

   const applyCoupon = async (planId, planPrice) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/subscription/apply-coupon`, {
      code: couponCodes[planId],
      amount: planPrice,
    });
    const newPrice = res.data.newPrice;
    setDiscountedPrices((prev) => ({ ...prev, [planId]: newPrice }));
    setShowCouponField((prev) => ({ ...prev, [planId]: false }));
  } catch (err) {
    console.error("❌ Invalid coupon or error applying:", err);
    setDiscountedPrices((prev) => ({ ...prev, [planId]: planPrice }));
  }
};

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/subscription/subscriptions`);
        setPlans(res.data);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="overlay"></div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            Welcome to <span className="highlight">FitTrack</span>
          </h1>
          <p>Your fitness journey starts here</p>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About FitTrack</h2>
        <p className="subtitle">Smarter Fitness Starts Here</p>
        <div className="about-grid">
          <div className="about-card">
            <h3>🏋️ Who We Are</h3>
            <p>
              FitTrack is a modern gym management system designed to help gym owners,
              trainers, and members stay connected. Whether you're managing clients or
              tracking your progress — we’ve got you covered.
            </p>
          </div>
          <div className="about-card">
            <h3>🎯 Our Mission</h3>
            <p>
              We empower people to lead healthier lives by simplifying fitness routines,
              diet planning, and progress monitoring — all in one seamless platform.
            </p>
          </div>
          <div className="about-card">
            <h3>🚀 Why FitTrack?</h3>
            <ul>
              <li>✔ Personalized Workouts & Diets</li>
              <li>✔ Admin Panel for Trainers</li>
              <li>✔ Easy Subscription Management</li>
              <li>✔ Calorie & Nutrition Tools</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="plans-section">
        <div className="plans-wrapper">
          <h2>Our Subscription Plans</h2>
          {auth.user ? (


      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan._id} className="plan-card">
            <h3>{plan.name}</h3>
            <p>Duration: {plan.duration}</p>

            
                {discountedPrices[plan._id] && discountedPrices[plan._id] !== plan.price ? (
                  <div>
                    <p className="price line-through">₹{plan.price}</p>
                    <p className="price">Now: ₹{discountedPrices[plan._id]}</p>
                  </div>
                ) : (
                  <p className="price">₹{plan.price}</p>
                )}
                <p>{plan.description}</p>

                {!showCouponField[plan._id] && !discountedPrices[plan._id] ? (
                  <button
                    className="coupon-button"
                    onClick={() =>
                      setShowCouponField((prev) => ({
                        ...prev,
                        [plan._id]: true,
                      }))
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
                        setCouponCodes((prev) => ({
                          ...prev,
                          [plan._id]: e.target.value,
                        }))
                      }
                      className="coupon-input"
                    />
                    <button
                      className="apply-button"
                      onClick={() => applyCoupon(plan._id, plan.price)}
                    >
                      Apply Coupon
                    </button>
                  </>
                ) : null}

                <button
                  className="choose-plan-btn"
                  onClick={() =>
                    handleSubscribe(
                      plan,
                      auth,
                      couponCodes[plan._id],
                      discountedPrices[plan._id] || plan.price
                    )
                  }
                >
                  Buy Now
                </button>
              
            
          </div>
        ))}
      </div>
          ):(
            <div className="plans-grid">
              {plans.map((plan) => (
                <div key={plan._id} className="plan-card">
                  <h3>{plan.name}</h3>
                  <p>Duration: {plan.duration}</p>
                  <p className="price">₹{plan.price}</p>
                  <p>{plan.description}</p>
                  
                  <a href="/auth/signup" className="btn-primary">Join Now</a>
                </div>
              ))}
            </div>
          
          )}
            
          
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="testimonial-card"
          >
            <p className="quote">
              "FitTrack helped me lose 10kg in 3 months with custom plans!"
            </p>
            <p className="author">– Priya Sharma</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="testimonial-card"
          >
            <p className="quote">"The workout and diet recommendations are spot on."</p>
            <p className="author">– Rahul Mehta</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="testimonial-card"
          >
            <p className="quote">
              "Everything I need in one place. Subscriptions, nutrition, and tracking."
            </p>
            <p className="author">– Ayesha Khan</p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>FitTrack</h3>
            <p>
              Your fitness journey simplified with personalized workouts, diet plans,
              and progress tracking.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#plans">Plans</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="/auth/login">Login</a></li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Homepages;
