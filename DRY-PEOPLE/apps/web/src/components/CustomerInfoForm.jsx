import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CustomerInfoForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Delivery address is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bebas text-[#E8001D] mb-6">CUSTOMER DETAILS</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#E8001D] focus:border-transparent outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#E8001D] focus:border-transparent outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="e.g. 08123456789"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#E8001D] focus:border-transparent outline-none transition-all ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full delivery address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8001D] focus:border-transparent outline-none transition-all"
            placeholder="Special requests, size details, etc."
          />
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
        >
          BACK
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="flex-1 px-6 py-3 bg-[#E8001D] text-white font-bold rounded-lg hover:bg-[#c00018] transition-colors"
        >
          CONFIRM ORDER
        </motion.button>
      </div>
    </form>
  );
};

export default CustomerInfoForm;