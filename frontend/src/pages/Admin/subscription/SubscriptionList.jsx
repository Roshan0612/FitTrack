import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/Auth';
import AdminMenu from '../AdminMenu';
import '../../../styles/SubscriptionList.css';
import '../../../styles/AdminDashboard.css'; 

const API_URL = import.meta.env.VITE_API_URL;

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [auth] = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/subscription/subscriptions`, {
        headers: {
          Authorization: auth.token,
        },
      });
      setSubscriptions(res.data);
    } catch (err) {
      console.error(' Error fetching subscriptions:', err);
      alert('Failed to load subscriptions');
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

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

        
        <div className="flex-1 p-6 md:p-10 text-white">
          <h2 className="text-3xl font-semibold mb-6">📦 Subscription Plans</h2>

          {subscriptions.length === 0 ? (
            <p className="text-gray-200">No subscriptions found.</p>
          ) : (
            <div className="transparent-card p-4 overflow-x-auto max-w-full text-black">
              <table className="subscription-table w-full">
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
    </div>
  );
};

export default SubscriptionList;
