import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
        return twMerge(clsx(inputs));
}

/**
 * Global product image configuration.
 * Easy way to change or override images for products.
 */
export const PRODUCT_IMAGES = {
  // Mock product overrides
  'mock-boxy-3': 'https://i.ibb.co.com/vG1SzHB/Foto-1.jpg',
  'mock1': 'https://i.ibb.co.com/TxwXbYbZ/KAOS-1.jpg',
  'mock2': 'https://i.ibb.co.com/TxwXbYbZ/KAOS-1.jpg',
  'mock3': 'https://i.ibb.co.com/TxwXbYbZ/KAOS-1.jpg',
  
  // Default placeholder
  'default': 'https://i.ibb.co.com/TxwXbYbZ/KAOS-1.jpg'
};

/**
 * Helper to get the correct image URL for a product
 */
export const getProductImage = (product, pbClient) => {
  if (!product) return PRODUCT_IMAGES.default;
  
  // Check for overrides first
  if (PRODUCT_IMAGES[product.id]) {
    return PRODUCT_IMAGES[product.id];
  }

  // PocketBase image handling
  if (product.image && pbClient) {
    return pbClient.files.getUrl(product, product.image);
  }

  return PRODUCT_IMAGES.default;
};
