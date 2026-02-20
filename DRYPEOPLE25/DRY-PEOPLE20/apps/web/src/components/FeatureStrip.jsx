import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Truck } from 'lucide-react';

const FeatureStrip = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'High-quality materials and craftsmanship',
    },
    {
      icon: ShieldCheck,
      title: 'Original Product',
      description: '100% authentic streetwear',
    },
    {
      icon: Truck,
      title: 'Free Ongkir',
      description: 'Free shipping on all orders',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <feature.icon size={48} className="text-[#E8001D]" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <div className="w-16 h-1 bg-[#E8001D] mx-auto mb-3" />
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureStrip;