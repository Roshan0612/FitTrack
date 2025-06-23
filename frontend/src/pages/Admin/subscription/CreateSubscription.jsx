import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';
import AdminMenu from '../AdminMenu';
import '../../../styles/CreateSubscription.css'; 

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
      await axios.post(
        `${API_URL}/api/v1/subscription/create-subscription`,
        { name, price, duration, description },
        {
          headers: {
            Authorization: auth?.token,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Subscription created successfully');
      setName('');
      setPrice('');
      setDuration('');
      setDescription('');
      navigate('/admin/dashboard/subscriptionlist');
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Failed to create subscription');
    }
  };

  return (
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen relative">
        
        <button
          className="absolute top-4 left-4 z-20 md:hidden bg-white bg-opacity-20 text-white px-3 py-2 rounded backdrop-blur-sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        
        <div
          className={`fixed md:static z-10 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <AdminMenu />
        </div>

        
        <div className="flex-1 p-6 md:p-10 text-white flex flex-col justify-center items-center">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold mb-2">Create New Subscription</h1>
            <p className="text-sm text-gray-200">Add a new subscription plan for your users.</p>
          </div>

          <div className="transparent-card w-full max-w-xl bg-white bg-opacity-80 text-black p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1">Plan Name</label>
                <input
                  type="text"
                  placeholder="E.g. Premium Plan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Price (₹)</label>
                <input
                  type="number"
                  placeholder="E.g. 499"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Duration</label>
                <input
                  type="text"
                  placeholder="E.g. 3 months"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  placeholder="Enter plan details"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Create Subscription
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubscription;
