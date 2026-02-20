import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductCard from '@/components/ProductCard.jsx';

const KatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = ['Semua', 'T-Shirt', 'Hoodie', 'Pants', 'Accessories', 'Pre-Order'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const records = await pb.collection('products').getFullList({
          sort: '-created',
          $autoCancel: false,
        });
        setProducts(records);
        setFilteredProducts(records);
      } catch (err) {
        console.warn('PocketBase not reachable, using mock data for demo');
        const mockData = [
          {
            id: 'mock-boxy-3',
            name: 'Kaos Boxy 3',
            price: 125000,
            originalPrice: 175000,
            category: 'T-Shirt',
            status: 'READY STOCK',
            sizes: ['S', 'M', 'L', 'XL'],
            images: [
              '/images/kaos-boxy-3.jpg',
              '/images/kaos-boxy-3.jpg',
              '/images/kaos-boxy-3.jpg'
            ]
          },
          {
            id: 'mock1',
            name: 'KAOS BOXY PREMIUM DRY PEOPLE',
            price: 125000,
            originalPrice: 175000,
            category: 'T-Shirt',
            status: 'READY STOCK',
            sizes: ['S', 'M', 'L', 'XL'],
            images: [
              '/images/kaos-boxy-3.jpg',
              '/images/kaos-boxy-3.jpg',
              '/images/kaos-boxy-3.jpg'
            ]
          },
          {
            id: 'mock2',
            name: 'KAOS BOXY PREMIUM DRY PEOPLE',
            price: 85000,
            originalPrice: 175000,
            category: 'T-Shirt',
            status: 'PRE-ORDER',
            sizes: ['M', 'L', 'XL'],
            images: [
              '/images/kaos-boxy-3.jpg',
              '/images/kaos-boxy-3.jpg',
              '/images/kaos-boxy-3.jpg'
            ]
          },
          {
            id: 'mock3',
            name: 'COOMING SOON',
            price: 0,
            category: 'T-Shirt',
            status: 'READY STOCK',
            sizes: ['28', '30', '32', '34'],
            images: [
              '/images/kaos-boxy-3.jpg',
              '/images/kaos-boxy-3.jpg',
              '/images/kaos-boxy-3.jpg'
            ]
          }
        ];
        setProducts(mockData);
        setFilteredProducts(mockData);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeFilter === 'Semua') {
      setFilteredProducts(products);
    } else if (activeFilter === 'Pre-Order') {
      setFilteredProducts(products.filter((p) => p.status === 'PRE-ORDER'));
    } else {
      setFilteredProducts(products.filter((p) => p.category === activeFilter));
    }
  }, [activeFilter, products]);

  return (
    <>
      <Helmet>
        <title>Katalog - DRY PEOPLE</title>
        <meta
          name="description"
          content="Browse our complete collection of streetwear products. Filter by category and find your perfect style at DRY PEOPLE."
        />
      </Helmet>

      <Header />

      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-bebas text-[#E8001D] mb-4">KATALOG</h1>
            <p className="text-gray-600">Explore our complete collection</p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#E8001D] text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#E8001D]'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Product Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load products. Please try again.</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found.</p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default KatalogPage;