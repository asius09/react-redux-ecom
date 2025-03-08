import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { toggleTheme } from "../../feature/theme/theme";

const Navbar = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.products);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.add("light");
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 shadow-lg backdrop-blur-sm ${
        isDarkMode
          ? "bg-gray-900/95 text-gray-100"
          : "bg-white/95 text-gray-800"
      } transition-all duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <i className="ri-shopping-bag-fill text-2xl text-indigo-600"></i>
              <span className="font-bold text-xl">EcomStore</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-indigo-500 font-medium transition-colors py-2"
            >
              <i className="ri-dashboard-line"></i>
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 hover:text-indigo-500 font-medium transition-colors py-2"
            >
              <i className="ri-shopping-bag-3-line"></i>
              <span>Products</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 hover:text-indigo-500 font-medium transition-colors py-2 relative"
            >
              <i className="ri-shopping-cart-2-line"></i>
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-4 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 ring-1 ring-gray-700"
                  : "bg-gray-100 hover:bg-gray-200 ring-1 ring-gray-200"
              }`}
              aria-label="Toggle dark mode"
            >
              <i
                className={`${
                  isDarkMode ? "ri-sun-fill" : "ri-moon-fill"
                } text-xl ${isDarkMode ? "text-amber-400" : "text-indigo-600"}`}
              ></i>
            </button>

            <Link
              to="/account"
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 ring-1 ring-gray-700"
                  : "bg-gray-100 hover:bg-gray-200 ring-1 ring-gray-200"
              }`}
            >
              <i
                className={`ri-user-3-fill text-xl ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              ></i>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={handleToggleMobileMenu}
              className={`p-2 rounded-lg transition-all ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 ring-1 ring-gray-700"
                  : "bg-gray-100 hover:bg-gray-200 ring-1 ring-gray-200"
              }`}
            >
              <i
                className={`${
                  isMobileMenuOpen ? "ri-close-fill" : "ri-menu-fill"
                } text-xl ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden py-3 px-4 rounded-lg mt-2 mb-4 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            } shadow-lg`}
          >
            <Link
              to="/"
              className="flex items-center gap-2 py-3 px-2 hover:bg-indigo-500 hover:text-white rounded-md transition-colors"
            >
              <i className="ri-dashboard-line text-lg"></i>
              <span>Home</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-2 py-3 px-2 hover:bg-indigo-500 hover:text-white rounded-md transition-colors"
            >
              <i className="ri-shopping-bag-3-line text-lg"></i>
              <span>Products</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 py-3 px-2 hover:bg-indigo-500 hover:text-white rounded-md transition-colors"
            >
              <i className="ri-shopping-cart-2-line text-lg"></i>
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="ml-auto bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
