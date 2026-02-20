import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://i.ibb.co.com/BHqvL7tC/Whats-App-Image-2026-01-04-at-18-16-23.jpg"
              alt="DRY PEOPLE lifestyle"
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bebas text-[#E8001D] mb-6">ABOUT DRY PEOPLE</h2>
            <div className="w-24 h-1 bg-[#E8001D] mb-6" />
            <p className="text-gray-700 mb-4 leading-relaxed">
              DRY PEOPLE is more than just a streetwear brand – it's a lifestyle. Born from the
              streets and inspired by urban culture, we create authentic pieces that speak to the
              bold and the fearless.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our mission is to deliver premium quality streetwear that combines style, comfort,
              and authenticity. Every piece is carefully crafted to represent the spirit of the
              streets and the individuality of our community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Join the movement. Stay dry. Stay authentic.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;