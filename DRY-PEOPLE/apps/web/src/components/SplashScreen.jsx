import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
    >
      <h1
        className="text-7xl md:text-9xl font-bebas text-[#E8001D] mb-8"
      >
        DRY PEOPLE
      </h1>
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          style={{ transformOrigin: 'left' }}
          className="h-full bg-[#E8001D]"
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;