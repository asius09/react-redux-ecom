import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, subTotal } from "../../feature/ecom/cartSlice";
import CartItem from "./CartItem";
import OrderSummery from "./OrderSummery";

const Cart = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const cartItems = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price * item.quantity;
      return total + itemPrice;
    }, 0);
  };

  const calculateDiscount = (price, discountPercentage) => {
    return price * (discountPercentage / 100);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeProduct({ id }));
  };

  const formatCurrency = (amount) => {
    return amount.toFixed(2);
  };

  return (
    <div
      className={`pt-24 pb-10 px-6 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <i className="ri-shopping-cart-2-line mr-3 text-indigo-600"></i>
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div
            className={`p-10 rounded-xl text-center ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg transition-all duration-300`}
          >
            <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center rounded-full bg-indigo-100">
              <i className="ri-shopping-cart-line text-6xl text-indigo-500"></i>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
            <p
              className={`mb-6 max-w-md mx-auto ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Looks like you haven't added any products to your cart yet.
              Explore our collection and find something you'll love!
            </p>
            <button
              className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              onClick={() => window.history.back()}
            >
              <i className="ri-arrow-left-line mr-2"></i>Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div
                className={`rounded-xl overflow-hidden shadow-lg mb-6 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-100"
                          }`}
                        >
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title || item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <i className="ri-shopping-bag-line text-3xl text-indigo-500"></i>
                          )}
                        </div>
                      </div>

                      <div className="flex-grow">
                        <CartItem
                          item={item}
                          formatCurrency={formatCurrency}
                          calculateDiscount={calculateDiscount}
                          handleRemoveItem={handleRemoveItem}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummery
                cartItems={cartItems}
                formatCurrency={formatCurrency}
                calculateDiscount={calculateDiscount}
                calculateTotal={calculateTotal}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
