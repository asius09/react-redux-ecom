import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router";
import { toggleTheme } from "../../feature/theme/theme";

const Navbar = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((state) => state.cart.products);
  const location = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
    // Clear search after submission
    setSearchQuery("");
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-colors py-2 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-500"
                }`
              }
            >
              <i className="ri-dashboard-line"></i>
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-colors py-2 ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-500"
                }`
              }
            >
              <i className="ri-shopping-bag-3-line"></i>
              <span>Products</span>
            </NavLink>
            <NavLink
              to="/cart/name"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-colors py-2 relative ${
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "hover:text-indigo-500"
                }`
              }
            >
              <i className="ri-shopping-cart-2-line"></i>
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-4 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </div>

          <div className="hidden md:flex items-center mr-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-100 focus:ring-indigo-500 border-gray-700"
                    : "bg-gray-100 text-gray-800 focus:ring-indigo-400 border-gray-200"
                } border`}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <i className={`ri-search-line ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}></i>
              </button>
            </form>
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
            <form onSubmit={handleSearch} className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-100 focus:ring-indigo-500 border-gray-600"
                    : "bg-white text-gray-800 focus:ring-indigo-400 border-gray-200"
                } border`}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <i className={`ri-search-line ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}></i>
              </button>
            </form>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 py-3 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                }`
              }
            >
              <i className="ri-dashboard-line text-lg"></i>
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center gap-2 py-3 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                }`
              }
            >
              <i className="ri-shopping-bag-3-line text-lg"></i>
              <span>Products</span>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center gap-2 py-3 px-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-500 hover:text-white"
                }`
              }
            >
              <i className="ri-shopping-cart-2-line text-lg"></i>
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="ml-auto bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
