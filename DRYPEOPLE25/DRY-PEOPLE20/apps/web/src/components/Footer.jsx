import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bebas text-[#E8001D] mb-4">CONTACT US</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <span>contact@drypeople25.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <span>+62 895 0674 0917</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} />
                <span>Kota Depok, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bebas text-[#E8001D] mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/dry.ppl25?igsh=MXJtdnppMXA1NmFiNA=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8001D] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8001D] transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E8001D] transition-colors"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bebas text-[#E8001D] mb-4">QUICK LINKS</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-[#E8001D] transition-colors">
                Home
              </Link>
              <Link to="/katalog" className="block hover:text-[#E8001D] transition-colors">
                Katalog
              </Link>
              <Link to="/#about" className="block hover:text-[#E8001D] transition-colors">
                About
              </Link>
              <Link to="/#contact" className="block hover:text-[#E8001D] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>&copy; 2026 DRY PEOPLE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;