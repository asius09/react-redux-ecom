import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../feature/ecom/cartSlice";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import {
  addWishlistProduct,
  removeWishlistProduct,
} from "../../feature/ecom/wishlistSlice";

const ProductCard = ({ product }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const wishlistItems = useSelector((state) => state.wishlist?.products || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addProduct(product));
    navigate("/cart/user");
  };

  const handleBuyNow = () => {
    dispatch(addProduct(product));
    navigate("/cart/user");
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeWishlistProduct(product));
    } else {
      dispatch(addWishlistProduct(product));
    }
  };

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden h-[480px] w-full ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <Link to={`/product/${product.key}`} className="block h-[220px]">
        <div className="relative h-full w-full bg-gray-200">
          {product.images ? (
            <img
              src={product.images[0]}
              alt={product.title || product.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="ri-shopping-bag-line text-4xl text-gray-400"></i>
            </div>
          )}
          {product.discountPercentage && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(product.discountPercentage)}% OFF
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist();
            }}
            className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white bg-opacity-70 flex items-center justify-center transition-colors hover:bg-opacity-100"
          >
            <i
              className={`${
                isInWishlist
                  ? "ri-heart-fill text-red-500"
                  : "ri-heart-line text-gray-600"
              }`}
            ></i>
          </button>
        </div>
      </Link>

      <div className="p-4 h-[260px] flex flex-col">
        <Link to={`/product/${product.key}`} className="block h-[50px]">
          <h3 className="font-semibold text-lg mb-1 hover:text-indigo-500 transition-colors truncate">
            {product.title || product.name}
          </h3>
        </Link>

        <div className="flex justify-between items-center mb-3 h-[30px]">
          <div>
            <span className="font-bold text-xl">
              ${product.price?.toFixed(2)}
            </span>
            {product.discountPercentage && (
              <span className="text-xs line-through ml-2 text-gray-500">
                $
                {(
                  product.price *
                  (1 + product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>
          {product.stock <= 5 && (
            <span className="text-xs text-red-500">
              Only {product.stock} left
            </span>
          )}
        </div>

        <div className="flex items-center mb-4 h-[24px]">
          {product.rating && (
            <div className="flex items-center">
              <i className="ri-star-fill text-yellow-400 mr-1"></i>
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                {product.rating.toFixed(1)} Rating
              </span>
            </div>
          )}
          <div className="text-sm ml-auto text-gray-500 dark:text-gray-400">
            {product.category}
          </div>
        </div>

        <p
          className={`text-sm mb-3 line-clamp-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {product.description
            ? product.description
            : "No description available..."}
        </p>

        <div className="grid grid-cols-2 gap-2 mt-auto h-[40px]">
          <button
            onClick={handleAddToCart}
            className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors flex items-center justify-center"
          >
            <i className="ri-shopping-cart-line mr-2"></i>
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center justify-center"
          >
            <i className="ri-shopping-bag-3-line mr-2"></i>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
