import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PreOrderBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#E8001D]">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl md:text-8xl font-bebas text-white mb-4">
            PRE-ORDER NOW
          </h2>
          <p className="text-white text-xl mb-8">
            Get exclusive access to our upcoming collection
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/katalog')}
            className="bg-white text-[#E8001D] px-10 py-4 text-xl font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            SHOP PRE-ORDER
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PreOrderBanner;