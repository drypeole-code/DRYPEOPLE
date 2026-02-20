import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { getProductImage } from '@/lib/utils';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const imageUrl = getProductImage(product, pb);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="aspect-square bg-gray-100 relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-300" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 text-xs font-bold text-white rounded ${
              product.status === 'PRE-ORDER' ? 'bg-[#E8001D]' : 'bg-black'
            }`}
          >
            {product.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex flex-col">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-gray-400 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <p className="text-[#E8001D] font-bold text-xl">{formatPrice(product.price)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;