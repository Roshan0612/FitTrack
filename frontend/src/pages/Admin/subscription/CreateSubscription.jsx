import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../AdminMenu'; // make sure path is correct
import '../../../styles/CreateSubscription.css'; // you'll create this

const API_URL = import.meta.env.VITE_API_URL;

const CreateSubscription = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/subscription/create-subscription`,
        { name, price, duration, description },
        {
          headers: {
            Authorization: auth?.token,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('✅ Subscription created successfully');
      setName('');
      setPrice('');
      setDuration('');
      setDescription('');
      navigate('/admin/dashboard/subscriptionlist');
    } catch (error) {
      console.error('❌ Error creating subscription:', error);
      alert('Failed to create subscription');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="absolute top-4 left-4 z-20 md:hidden bg-black text-white px-3 py-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static z-10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <AdminMenu />
      </div>

      {/* Form Content */}
      <div className="flex-1 p-4 md:p-10">
        <div className="form-card">
          <h2>Create Subscription Plan</h2>
          <form onSubmit={handleSubmit}>
            <label>Plan Name</label>
            <input
              type="text"
              placeholder="E.g. Premium Plan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Price (₹)</label>
            <input
              type="number"
              placeholder="E.g. 499"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label>Duration (e.g. 3 months)</label>
            <input
              type="text"
              placeholder="E.g. 1 month"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />

            <label>Description</label>
            <textarea
              placeholder="Enter details about the plan"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSubscription;
