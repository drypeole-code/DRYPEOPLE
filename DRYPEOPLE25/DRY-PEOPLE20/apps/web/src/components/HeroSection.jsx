import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1610241852709-5293088ca6c4)',
        }}
      />

      {/* Red Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8001D] to-[#8B0000] opacity-85" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-7xl md:text-9xl font-bebas mb-4">DRY PEOPLE</h1>
        <p className="text-2xl md:text-4xl font-bebas mb-8 tracking-wider">
          AUTHENTIC STREETWEAR
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/katalog')}
          className="bg-white text-[#E8001D] px-8 py-4 text-xl font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          SHOP NOW
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;