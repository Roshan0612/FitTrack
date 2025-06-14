import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateSubscription = () => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    price: '',
    description: '',
    discount: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/create-subscription', {
        method: 'POST',
        body: form,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Subscription created successfully!');
        setFormData({
          title: '',
          duration: '',
          price: '',
          description: '',
          discount: '',
          image: null,
        });
      } else {
        toast.error(result.message || 'Failed to create subscription');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white p-5 text-center text-2xl font-semibold shadow-md">
        Create Subscription Plan
      </header>

      <main className="flex-grow bg-gray-100 py-10 px-5 flex justify-center">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Subscription Details</h2>

          <input
            type="text"
            name="title"
            placeholder="Subscription Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 1 month)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price in ₹"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />

          <textarea
            name="description"
            placeholder="Subscription Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount % (optional)"
            value={formData.discount}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full mb-6"
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
            Create Subscription
          </button>
        </form>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        &copy; {new Date().getFullYear()} FitTrack | Admin Panel
      </footer>
    </div>
  );
};

export default CreateSubscription;
