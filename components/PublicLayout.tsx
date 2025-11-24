import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, cart, user } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold font-heading text-[color:var(--color-primary)]">
                {settings.siteName}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[color:var(--color-primary)] font-medium">Home</Link>
              <a href="#collections" className="text-gray-700 hover:text-[color:var(--color-primary)] font-medium">Collections</a>
              <Link to="/blog" className="text-gray-700 hover:text-[color:var(--color-primary)] font-medium">Blog</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <Link to="/cart" className="relative text-gray-600 hover:text-[color:var(--color-primary)]">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </Link>
              {user ? (
                <Link to="/admin" className="text-sm font-medium text-[color:var(--color-primary)]">
                  My Account
                </Link>
              ) : (
                <Link to="/admin/login" className="text-gray-600 hover:text-[color:var(--color-primary)]">
                  <i className="fa-regular fa-user text-xl"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[color:var(--color-primary)] text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">{settings.siteName}</h3>
              <p className="text-gray-300">Your trusted online shopping destination.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li><i className="fa-solid fa-location-dot mr-2"></i> {settings.address}</li>
                <li><i className="fa-solid fa-envelope mr-2"></i> {settings.supportEmail}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;