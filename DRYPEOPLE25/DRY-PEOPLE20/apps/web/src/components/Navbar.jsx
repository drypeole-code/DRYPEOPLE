import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bebas tracking-wider">
            DRY PEOPLE
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#E8001D] transition-colors">Home</Link>
            <Link to="/katalog" className="hover:text-[#E8001D] transition-colors">Katalog</Link>
            <a href="#about" className="hover:text-[#E8001D] transition-colors">About</a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/" className="block hover:text-[#E8001D] transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/katalog" className="block hover:text-[#E8001D] transition-colors" onClick={() => setIsOpen(false)}>Katalog</Link>
            <a href="#about" className="block hover:text-[#E8001D] transition-colors" onClick={() => setIsOpen(false)}>About</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
