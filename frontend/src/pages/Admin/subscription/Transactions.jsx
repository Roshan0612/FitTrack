import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/Auth";
import AdminMenu from "../AdminMenu";
import "../../../styles/Transactions.css";
import "../../../styles/AdminDashboard.css"; 
const API_URL = import.meta.env.VITE_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [auth] = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchTxns = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/subscription/all-transactions`, {
          headers: { Authorization: auth.token },
        });
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTxns();
  }, [auth]);

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
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <AdminMenu />
        </div>

        
        <div className="flex-1 p-4 md:p-10 text-white">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold">💳 All Transactions</h2>
            <p className="text-sm text-gray-200">View payment history and details</p>
          </div>

          <div className="transparent-card overflow-auto max-w-full text-black p-0">
            <div className="transaction-table-wrapper">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Order ID</th>
                    <th>Payment ID</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn._id}>
                      <td>{txn.user?.name}</td>
                      <td>{txn.plan?.name}</td>
                      <td>₹{txn.plan?.price}</td>
                      <td>{txn.razorpay_order_id}</td>
                      <td>{txn.razorpay_payment_id}</td>
                      <td>{new Date(txn.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
