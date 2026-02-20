import React from 'react';
import pb from '@/lib/pocketbaseClient';
import { Package } from 'lucide-react';
import { getProductImage } from '@/lib/utils';

const OrderSummary = ({ order }) => {
  const { product, size, quantity, totalPrice } = order;
  const imageUrl = getProductImage(product, pb);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bebas text-[#E8001D] mb-4">ORDER SUMMARY</h2>
      <div className="flex gap-4 mb-4">
        <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
           {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-300" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-gray-600">Size: <span className="font-semibold text-black">{size}</span></p>
          <p className="text-gray-600">Qty: <span className="font-semibold text-black">{quantity}</span></p>
          <p className="text-[#E8001D] font-bold mt-1">
            Rp {product.price.toLocaleString('id-ID')} / item
          </p>
        </div>
      </div>
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total</span>
          <span className="text-[#E8001D]">Rp {totalPrice.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;