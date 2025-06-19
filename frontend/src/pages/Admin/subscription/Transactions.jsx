import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/Auth";
import AdminMenu from "../AdminMenu"; // adjust path if needed
import "../../../styles/Transactions.css"; // include your CSS file

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
        console.error("❌ Error fetching transactions:", err);
      }
    };

    fetchTxns();
  }, [auth]);

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
      <div className={`fixed md:static z-10 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <AdminMenu />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10">
        <h2 className="text-2xl font-bold mb-6">All Transactions</h2>
        <div className="overflow-auto transaction-table-wrapper">
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
              {transactions.map(txn => (
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
  );
};

export default Transactions;
