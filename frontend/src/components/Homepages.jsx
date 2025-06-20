import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

const Homepages = () => {
  const [plans, setPlans] = useState([]);

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
      {/* Hero Section with Animation */}
      <section
  id="home"
  className="hero-section flex items-center justify-center text-white text-center h-screen bg-cover bg-center relative"
  style={{
    backgroundImage:
      "url('https://res.cloudinary.com/dswa5docr/image/upload/v1750358100/pexels-tima-miroshnichenko-6389869_nptvoo.jpg')",
  }}
>
  <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

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



      {/* About Section */}
      <section id="about" className="about-section py-16 px-6 bg-gray-100">
        <h2 className="about-title text-3xl font-bold text-center mb-6">About FitTrack</h2>
        <p className="about-subtitle text-center text-lg text-gray-600 mb-12">
          Smarter Fitness Starts Here
        </p>

        <div className="about-grid grid gap-8 max-w-6xl mx-auto md:grid-cols-3">
          <div className="about-card bg-white p-6 rounded shadow text-left">
            <h3 className="text-xl font-semibold mb-2">🏋️ Who We Are</h3>
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

      {/* Plans Section */}
      <section
        id="plans"
        className="py-16 px-4 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/demo/image/upload/v1687361715/plans-gym-bg.jpg')`,
        }}
      >
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Subscription Plans</h2>

          {plans.length === 0 ? (
            <p className="text-center">Loading plans...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan._id} className="bg-white p-4 rounded shadow-md border">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">Duration: {plan.duration}</p>
                  <p className="text-lg font-bold text-blue-700 mb-2">₹{plan.price}</p>
                  <p className="text-gray-700 text-sm mb-4">{plan.description}</p>
                  <a
                    href="/auth/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Join Now
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-gray-700"
          >
            <p className="italic">
              "FitTrack helped me lose 10kg in 3 months with custom plans!"
            </p>
            <p className="mt-4 font-semibold text-blue-700">– Priya Sharma</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-gray-700"
          >
            <p className="italic">"The workout and diet recommendations are spot on."</p>
            <p className="mt-4 font-semibold text-blue-700">– Rahul Mehta</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md text-gray-700"
          >
            <p className="italic">
              "Everything I need in one place. Subscriptions, nutrition, and tracking."
            </p>
            <p className="mt-4 font-semibold text-blue-700">– Ayesha Khan</p>
          </motion.div>
        </div>
      </div>

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
