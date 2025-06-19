import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/Auth';
import AdminMenu from '../AdminMenu'; // update path if needed
import '../../../styles/SubscriptionList.css'; // make sure to create this

const API_URL = import.meta.env.VITE_API_URL;

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [auth] = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar toggle button (mobile only) */}
      <button
        className="absolute top-4 left-4 z-20 md:hidden bg-black text-white px-3 py-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static z-10 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <AdminMenu />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-10">
        <h2 className="text-2xl font-bold mb-6">📦 Subscription Plans</h2>
        {subscriptions.length === 0 ? (
          <p>No subscriptions found.</p>
        ) : (
          <div className="overflow-auto subscription-table-wrapper">
            <table className="subscription-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Description</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub._id}>
                    <td>{sub.name}</td>
                    <td>₹{sub.price}</td>
                    <td>{sub.duration}</td>
                    <td>{sub.description}</td>
                    <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionList;
