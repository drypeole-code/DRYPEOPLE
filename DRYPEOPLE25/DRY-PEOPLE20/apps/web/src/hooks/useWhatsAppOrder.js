import { useCallback } from 'react';

const useWhatsAppOrder = () => {
  const generateWhatsAppLink = useCallback((orderData, customerData) => {
    const { product, size, quantity, totalPrice } = orderData;
    const { name, phone, address, notes } = customerData;

    const message = `Halo DRY PEOPLE! 👋

📦 Produk: ${product.name}
📏 Ukuran: ${size}
📊 Jumlah: ${quantity}
💰 Total: Rp ${totalPrice.toLocaleString('id-ID')}

👤 Nama: ${name}
📱 No. WhatsApp: ${phone}
📍 Alamat: ${address}

Catatan: ${notes || "Tidak ada"}`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/6289506740917?text=${encodedMessage}`;
  }, []);

  return { generateWhatsAppLink };
};

export default useWhatsAppOrder;
