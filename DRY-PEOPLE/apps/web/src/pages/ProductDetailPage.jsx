import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useToast } from '@/components/ui/use-toast.jsx';
import { getProductImage } from '@/lib/utils';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Order state
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const record = await pb.collection('products').getOne(id, {
          $autoCancel: false,
        });
        setProduct(record);
      } catch (err) {
        console.warn('PocketBase not reachable, using mock data for detail');
        const mockProducts = {
          'mock-boxy-3': {
            id: 'mock-boxy-3',
            name: 'Kaos Boxy 3',
            price: 125000,
            originalPrice: 175000,
            description: 'Kaos Boxy Premium quality.',
            category: 'T-Shirt',
            status: 'READY STOCK',
            sizes: ['S', 'M', 'L', 'XL'],
            images: ['https://i.ibb.co.com/vG1SzHB/Foto-1.jpg', 'https://i.ibb.co.com/Lhd5MfnS/IMG-20260131-WA0007.jpg', 'https://i.ibb.co.com/twZ5sy1C/Whats-App-Image-2026-01-31-at-08-32-28.jpg']
          },
          'mock1': {
            id: 'mock1',
            name: 'KAOS PREMIUM BOXY DRY PEOPLE',
            price: 125000,
            originalPrice: 175000,
            description: 'Kaos Premium Boxy 210GSM 100% Heavy Cotton Gramasi 210,Cutting Boxy,Artikel Pertama dari brand Dry People.',
            category: 'T-Shirt',
            status: 'READY STOCK',
            sizes: ['S', 'M', 'L', 'XL'],
            images: ['https://i.ibb.co.com/TxwXbYbZ/KAOS-1.jpg', 'https://i.ibb.co.com/4ZPT13pv/Whats-App-Image-2026-02-20-at-15-08-51.jpg', 'https://i.ibb.co.com/Qvhyb7Sy/Whats-App-Image-2026-20-at-15-10-20.jpg']
          },
          'mock2': {
            id: 'mock2',
            name: 'KAOS PREMIUM BOXY DRY PEOPLE',
            price: 85000,
            originalPrice: 175000,
            description: 'Kaos Premium Boxy 210GSM 100% Heavy Cotton Gramasi 210,Cutting Boxy,Artikel Pertama dari brand Dry People.',
            category: 'T-Shirt',
            status: 'PRE-ORDER',
            sizes: ['M', 'L', 'XL'],
            images: ['https://i.ibb.co.com/TxwXbYbZ/KAOS-1.jpg', 'https://i.ibb.co.com/4ZPT13pv/Whats-App-Image-2026-02-20-at-15-08-51.jpg', 'https://i.ibb.co.com/Qvhyb7Sy/Whats-App-Image-2026-20-at-15-10-20.jpg']
          },
          'mock3': {
            id: 'mock3',
            name: 'COOMING SOON',
            price: 0,
            description: 'COOMING SOON.',
            category: '-',
            status: 'READY STOCK',
            sizes: ['-', '-', '-', '-'],
            images: ['https://i.ibb.co.com/BHqvL7tC/Whats-App-Image-2026-01-04-at-18-16-23.jpg', 'https://i.ibb.co.com/BHqvL7tC/Whats-App-Image-2026-01-04-at-18-16-23.jpg', 'https://i.ibb.co.com/BHqvL7tC/Whats-App-Image-2026-01-04-at-18-16-23.jpg']
          }
        };
        
        if (mockProducts[id]) {
          setProduct(mockProducts[id]);
          if (mockProducts[id].sizes?.length > 0) {
            setSelectedSize(mockProducts[id].sizes[0]);
          }
        } else {
          setError('Product not found');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handleQuantityChange = (type) => {
    if (type === 'decrease') {
      if (quantity > 1) setQuantity(quantity - 1);
    } else {
      if (quantity < 99) setQuantity(quantity + 1);
    }
  };

  const handleQuantityInput = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= 99) {
      setQuantity(val);
    }
  };

  const handleCheckout = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      toast({
        title: 'Please select a size',
        description: 'You must select a size before proceeding to checkout.',
        variant: 'destructive',
      });
      return;
    }

    const totalPrice = product.price * quantity;

    navigate('/checkout', {
      state: {
        product,
        size: selectedSize,
        quantity,
        totalPrice
      }
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <p className="text-gray-600">Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">Product not found</p>
            <button
              onClick={() => navigate('/katalog')}
              className="text-[#E8001D] hover:underline"
            >
              Back to Katalog
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} - DRY PEOPLE`}</title>
        <meta name="description" content={product.description || `Shop ${product.name} at DRY PEOPLE`} />
      </Helmet>

      <Header />

      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/katalog')}
            className="flex items-center text-gray-600 hover:text-[#E8001D] mb-8 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Katalog
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image Slider */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {product.images && product.images.length > 0 ? (
                    <motion.img
                      key={currentImageIndex}
                      src={product.images[currentImageIndex]}
                      alt={`${product.name} ${currentImageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  ) : getProductImage(product, pb) ? (
                    <img
                      src={getProductImage(product, pb)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-24 h-24 text-gray-300" />
                    </div>
                  )}
                </AnimatePresence>

                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImageIndex ? 'bg-[#E8001D]' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span
                  className={`px-4 py-2 text-sm font-bold text-white rounded ${
                    product.status === 'PRE-ORDER' ? 'bg-[#E8001D]' : 'bg-black'
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <h1 className="text-4xl font-bebas text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex flex-col mb-6">
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <p className="text-3xl font-bold text-[#E8001D]">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Category</h3>
                <p className="text-gray-600">{product.category}</p>
              </div>

              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Select Size</h3>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border-2 rounded flex items-center justify-center font-semibold transition-all ${
                          selectedSize === size
                            ? 'border-[#E8001D] bg-[#E8001D] text-white'
                            : 'border-gray-300 hover:border-[#E8001D] text-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {!selectedSize && (
                    <p className="text-sm text-red-500 mt-2">* Please select a size</p>
                  )}
                </div>
              )}

              {/* Quantity Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      className="p-3 hover:text-[#E8001D] transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={20} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={handleQuantityInput}
                      className="w-16 text-center font-bold text-lg outline-none"
                    />
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      className="p-3 hover:text-[#E8001D] transition-colors"
                      disabled={quantity >= 99}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="text-gray-600">
                    Total: <span className="font-bold text-[#E8001D]">{formatPrice(product.price * quantity)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full bg-[#E8001D] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#c00018] transition-colors"
              >
                CHECKOUT NOW
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetailPage;