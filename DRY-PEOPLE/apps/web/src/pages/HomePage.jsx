import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen.jsx';
import Header from '@/components/Header.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import FeatureStrip from '@/components/FeatureStrip.jsx';
import FeaturedProducts from '@/components/FeaturedProducts.jsx';
import AboutSection from '@/components/AboutSection.jsx';
import PreOrderBanner from '@/components/PreOrderBanner.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasSeenSplash', 'true');
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !showSplash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [showSplash]);

  return (
    <>
      <Helmet>
        <title>DRY PEOPLE - Authentic Streetwear</title>
        <meta
          name="description"
          content="DRY PEOPLE - Authentic streetwear brand offering premium quality t-shirts, hoodies, pants, and accessories. Shop the latest collection now."
        />
      </Helmet>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header />
            <HeroSection />
            <FeatureStrip />
            <FeaturedProducts />
            <AboutSection />
            <PreOrderBanner />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;