import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const Footer = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };
  
  return (
    <footer className={`py-12 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EcomStore</h3>
            <p className="text-sm">Shop the latest trends and essentials with our curated collection of high-quality products.</p>
            <div className="mt-4 flex items-center space-x-2">
              <i className={`ri-map-pin-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
              <span className="text-sm">123 Commerce St, Shopping City</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-indigo-500 transition-colors">All Products</Link></li>
              <li><Link to="/result" className="hover:text-indigo-500 transition-colors">New Arrivals</Link></li>
              <li><Link to="/result" className="hover:text-indigo-500 transition-colors">Best Sellers</Link></li>
              <li><Link to="/result" className="hover:text-indigo-500 transition-colors">Deals & Discounts</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Customer Service</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-500 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-3">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className={`px-3 py-2 text-sm rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
            <h3 className="text-lg font-semibold mt-6 mb-2">Connect</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-indigo-500 transition-colors"><i className="ri-facebook-fill"></i></a>
              <a href="#" className="hover:text-indigo-500 transition-colors"><i className="ri-instagram-line"></i></a>
              <a href="#" className="hover:text-indigo-500 transition-colors"><i className="ri-twitter-x-line"></i></a>
              <a href="#" className="hover:text-indigo-500 transition-colors"><i className="ri-pinterest-line"></i></a>
            </div>
          </div>
        </div>
        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mt-8 pt-8 text-sm`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} EcomStore. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center">
                <i className="ri-secure-payment-line mr-1"></i> Secure Payments
              </span>
              <span className="mx-3">|</span>
              <span className="inline-flex items-center">
                <i className="ri-truck-line mr-1"></i> Fast Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
