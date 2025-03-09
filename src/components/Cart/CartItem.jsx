import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, updateQuantity } from "../../feature/ecom/cartSlice";

const CartItem = ({ item, formatCurrency, calculateDiscount }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeProduct({ id }));
  };

  const incrementQuantity = (id) => {
    dispatch(updateQuantity({ id, update: "add" }));
  };

  const decrementQuantity = (id) => {
    dispatch(updateQuantity({ id, update: "subtract" }));
  };

  return (
    <div
      className={`p-4 mb-4 rounded-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-md transition-all duration-300`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div>
          <h3 className="font-medium text-lg">{item.title || item.name}</h3>
          {item.brand && (
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Brand: {item.brand}
            </div>
          )}
          {item.sku && (
            <div
              className={`text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              SKU: {item.sku}
            </div>
          )}
          {item.stock && item.stock <= 5 && (
            <span className="text-xs text-red-500 mt-1 inline-block">
              Only {item.stock} left in stock
            </span>
          )}
        </div>

        <div className="mt-3 sm:mt-0 flex flex-col sm:items-end">
          <div className="font-semibold text-lg">
            ${formatCurrency(item.price * item.quantity)}
          </div>
          <div
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            ${formatCurrency(item.price)} × {item.quantity}
          </div>
          {item.discountPercentage && (
            <div className="text-sm text-green-500 mt-1">
              Save $
              {formatCurrency(
                calculateDiscount(item.price, item.discountPercentage) *
                  item.quantity
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Quantity:
          </span>
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => decrementQuantity(item.id)}
              className={`px-2 py-1 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <i className="ri-subtract-line"></i>
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button
              onClick={() => incrementQuantity(item.id)}
              className={`px-2 py-1 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <i className="ri-add-line"></i>
            </button>
          </div>
        </div>

        <button
          onClick={() => handleRemoveItem(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors flex items-center"
          aria-label="Remove item"
        >
          <i className="ri-delete-bin-line mr-1"></i>
          <span className="text-sm">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
