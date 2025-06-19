import axios from "axios";
import { useAuth } from "../../../context/Auth";
import { useState } from "react";
import AdminMenu from "../AdminMenu"; // make sure the path is correct
import "../../../styles/CreateCoupon.css"; // CSS file we'll define below

const API_URL = import.meta.env.VITE_API_URL;

const CreateCoupon = () => {
  const [auth] = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [coupon, setCoupon] = useState({
    code: '',
    discountPercent: '',
    minAmount: '',
    expiryDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { code, discountPercent, expiryDate } = coupon;
    if (!code || !discountPercent || !expiryDate) {
      return alert("⚠️ Please fill all required fields.");
    }

    try {
      await axios.post(`${API_URL}/api/v1/subscription/create-coupon`, coupon, {
        headers: {
          Authorization: auth?.token,
        }
      });
      alert('✅ Coupon created successfully!');
      setCoupon({ code: '', discountPercent: '', minAmount: '', expiryDate: '' });
    } catch (err) {
      console.error("❌ Error creating coupon:", err);
      alert("Failed to create coupon. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Toggle for Mobile */}
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

      {/* Main Form Section */}
      <div className="flex-1 p-4 md:p-10">
        <div className="form-card">
          <h2>Create Coupon</h2>
          <form onSubmit={handleSubmit}>
            <label>Coupon Code *</label>
            <input
              type="text"
              placeholder="E.g. NEWUSER20"
              value={coupon.code}
              onChange={e => setCoupon({ ...coupon, code: e.target.value })}
              required
            />

            <label>Discount (%) *</label>
            <input
              type="number"
              value={coupon.discountPercent}
              onChange={e => setCoupon({ ...coupon, discountPercent: e.target.value })}
              required
            />

            <label>Minimum Amount (optional)</label>
            <input
              type="number"
              value={coupon.minAmount}
              onChange={e => setCoupon({ ...coupon, minAmount: e.target.value })}
            />

            <label>Expiry Date *</label>
            <input
              type="date"
              value={coupon.expiryDate}
              onChange={e => setCoupon({ ...coupon, expiryDate: e.target.value })}
              required
            />

            <button type="submit">➕ Create Coupon</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
