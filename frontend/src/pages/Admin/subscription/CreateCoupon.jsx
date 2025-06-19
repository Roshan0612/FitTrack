import axios from "axios";
import { useAuth } from "../../../context/Auth";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const CreateCoupon = () => {
  const [auth] = useAuth();
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
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block mb-1">Coupon Code *</label>
        <input
          placeholder="E.g. NEWUSER20"
          value={coupon.code}
          onChange={e => setCoupon({ ...coupon, code: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Discount (%) *</label>
        <input
          type="number"
          value={coupon.discountPercent}
          onChange={e => setCoupon({ ...coupon, discountPercent: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Minimum Amount (optional)</label>
        <input
          type="number"
          value={coupon.minAmount}
          onChange={e => setCoupon({ ...coupon, minAmount: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Expiry Date *</label>
        <input
          type="date"
          value={coupon.expiryDate}
          onChange={e => setCoupon({ ...coupon, expiryDate: e.target.value })}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        ➕ Create Coupon
      </button>
    </form>
  );
};

export default CreateCoupon;
