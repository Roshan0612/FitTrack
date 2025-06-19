import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const CreateSubscription = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/subscription/create-subscription`,
        {
          name,
          price,
          duration,
          description,
        },
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
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
};

export default CreateSubscription;
