import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import OrderSummary from '@/components/OrderSummary.jsx';
import CustomerInfoForm from '@/components/CustomerInfoForm.jsx';
import useWhatsAppOrder from '@/hooks/useWhatsAppOrder.js';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { generateWhatsAppLink } = useWhatsAppOrder();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate('/katalog');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const handleConfirmOrder = (customerData) => {
    const link = generateWhatsAppLink(orderData, customerData);
    window.open(link, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Checkout - DRY PEOPLE</title>
      </Helmet>
      <Header />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bebas text-[#E8001D] mb-8 text-center">CHECKOUT</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <OrderSummary order={orderData} />
              </div>
              <div>
                <CustomerInfoForm 
                  onSubmit={handleConfirmOrder}
                  onBack={() => navigate(-1)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;