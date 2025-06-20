import axios from "axios";
import { useAuth } from "../../../context/Auth";
import { useState } from "react";
import AdminMenu from "../AdminMenu";
import "../../../styles/CreateCoupon.css";
import "../../../styles/AdminDashboard.css"; // to inherit background & glass effect

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
    <div className="admin-dashboard-bg">
      <div className="flex bg-overlay min-h-screen relative">
        {/* Mobile Sidebar Toggle */}
        <button
          className="absolute top-4 left-4 z-20 md:hidden bg-white bg-opacity-20 text-white px-3 py-2 rounded backdrop-blur-sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        {/* Sidebar */}
        <div
          className={`fixed md:static z-10 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <AdminMenu />
        </div>

        {/* Main Form Area */}
        <div className="flex-1 p-6 md:p-10 flex flex-col justify-center items-center text-white">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold">➕ Create Coupon</h1>
            <p className="text-sm text-gray-200">Add a new discount code for your users.</p>
          </div>

          <div className="transparent-card w-full max-w-xl bg-white bg-opacity-80 text-black p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1">Coupon Code *</label>
                <input
                  type="text"
                  placeholder="E.g. NEWUSER20"
                  value={coupon.code}
                  onChange={(e) => setCoupon({ ...coupon, code: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Discount (%) *</label>
                <input
                  type="number"
                  value={coupon.discountPercent}
                  onChange={(e) => setCoupon({ ...coupon, discountPercent: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Minimum Amount (optional)</label>
                <input
                  type="number"
                  value={coupon.minAmount}
                  onChange={(e) => setCoupon({ ...coupon, minAmount: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Expiry Date *</label>
                <input
                  type="date"
                  value={coupon.expiryDate}
                  onChange={(e) => setCoupon({ ...coupon, expiryDate: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
