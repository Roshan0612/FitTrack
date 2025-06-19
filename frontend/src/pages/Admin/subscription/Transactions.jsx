

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/Auth";

const API_URL = import.meta.env.VITE_API_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchTxns = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/subscription/all-transactions`, {
          headers: {
            Authorization: auth.token,
          },
        });
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("❌ Error fetching transactions:", err);
      }
    };

    fetchTxns();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
      <div className="overflow-auto">
        <table className="min-w-full table-auto border border-collapse border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Plan</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Payment ID</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn._id}>
                <td className="border px-4 py-2">{txn.user?.name}</td>
                <td className="border px-4 py-2">{txn.plan?.name}</td>
                <td className="border px-4 py-2">₹{txn.plan?.price}</td>
                <td className="border px-4 py-2">{txn.razorpay_order_id}</td>
                <td className="border px-4 py-2">{txn.razorpay_payment_id}</td>
                <td className="border px-4 py-2">{new Date(txn.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
