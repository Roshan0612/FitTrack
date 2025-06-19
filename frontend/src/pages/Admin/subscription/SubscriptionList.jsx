import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/Auth';

const API_URL = import.meta.env.VITE_API_URL;

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [auth] = useAuth();

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/subscription/subscriptions`, {
        headers: {
          Authorization: auth.token
        }
      });
      setSubscriptions(res.data);
    } catch (err) {
      console.error('❌ Error fetching subscriptions:', err);
      alert('Failed to load subscriptions');
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📦 Subscription Plans</h2>
      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub._id}>
                <td className="border p-2">{sub.name}</td>
                <td className="border p-2">₹{sub.price}</td>
                <td className="border p-2">{sub.duration}</td>
                <td className="border p-2">{sub.description}</td>
                <td className="border p-2">{new Date(sub.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubscriptionList;
