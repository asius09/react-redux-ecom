import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import ProductCard from "../Products/ProductCard";

const Wishlist = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const wishlistItems = useSelector((state) => state.wishlist?.products || []);
  return (
    <div
      className={`min-h-screen pt-24 px-4 md:px-8 lg:px-16 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <i className="ri-heart-line text-6xl mb-4 text-gray-400"></i>
          <p className="text-xl mb-6">Your wishlist is empty</p>
          <Link
            to="/products"
            className={`px-6 py-3 rounded-lg font-medium ${
              isDarkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-500 hover:bg-indigo-600"
            } text-white transition-colors`}
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard key={item.id || item.key} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
