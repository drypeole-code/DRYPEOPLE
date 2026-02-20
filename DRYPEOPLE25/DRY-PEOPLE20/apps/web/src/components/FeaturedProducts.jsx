import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';
import ProductCard from '@/components/ProductCard.jsx';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const records = await pb.collection('products').getList(1, 4, {
          sort: '-created',
          $autoCancel: false,
        });
        setProducts(records.items);
      } catch (err) {
        console.warn('PocketBase not reachable, using mock data for demo');
        setProducts([
          {
            id: 'mock1',
            name: 'KAOS PREMIUM BOXY DRY PEOPLE ',
            price: 125000,
            description:'Kaos Premium Boxy 210GSM 100% Heavy Cotton Gramasi 210,Cutting Boxy,Artikel Pertama dari brand Dry People..',
            category: 'T-Shirt',
            status: 'READY STOCK',
            sizes: ['S', 'M', 'L', 'XL'],
          },
          {
            id: 'mock2',
            name: 'KAOS PREMIUM BOXY DRY PEOPLE',
            price: 85000,
            description: 'Kaos Premium Boxy 210GSM 100% Heavy Cotton Gramasi 210,Cutting Boxy,Artikel Pertama dari brand Dry People.',
            category: 'T-Shirt',
            status: 'PRE-ORDER',
            sizes: ['M', 'L', 'XL'],
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bebas text-[#E8001D] mb-2">NEW ARRIVALS</h2>
          <p className="text-gray-600">Check out our latest products</p>
        </motion.div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load products. Please try again.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;