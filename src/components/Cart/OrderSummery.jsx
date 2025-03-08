import React from "react";

const OrderSummery = ({ cartItems, formatCurrency, calculateDiscount, calculateTotal, isDarkMode }) => {
  return (
    <div
      className={`sticky top-24 rounded-xl shadow-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } overflow-hidden`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Order Summary</h2>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Subtotal (
              {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
              items)
            </span>
            <span>${formatCurrency(calculateTotal())}</span>
          </div>

          <div className="flex justify-between">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Estimated Tax
            </span>
            <span>${formatCurrency(calculateTotal() * 0.08)}</span>
          </div>

          <div className="flex justify-between">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Shipping
            </span>
            <span className="text-green-500">Free</span>
          </div>

          <div className="flex justify-between">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Discounts
            </span>
            <span className="text-green-500">
              -$
              {formatCurrency(
                cartItems.reduce(
                  (total, item) =>
                    total +
                    (item.discountPercentage
                      ? calculateDiscount(item.price, item.discountPercentage) *
                        item.quantity
                      : 0),
                  0
                )
              )}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="text-indigo-600 font-bold text-2xl">
              ${formatCurrency(calculateTotal() * 1.08)}
            </span>
          </div>
        </div>

        <button className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 mb-3 flex items-center justify-center font-medium shadow-md hover:shadow-lg">
          <i className="ri-secure-payment-line mr-2"></i> Checkout Now
        </button>

        <button
          className={`w-full py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center ${
            isDarkMode
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => window.history.back()}
        >
          <i className="ri-arrow-left-line mr-2"></i> Continue Shopping
        </button>

        <div className="mt-6 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
          <div className="text-sm">
            <p className="flex items-center mb-2">
              <i className="ri-truck-line mr-2 text-indigo-500"></i>
              <span>
                Estimated delivery:{" "}
                {cartItems[0]?.shippingInformation || "7-10 business days"}
              </span>
            </p>
            <p className="flex items-center">
              <i className="ri-refresh-line mr-2 text-indigo-500"></i>
              <span>
                Return policy:{" "}
                {cartItems[0]?.returnPolicy || "30 days return policy"}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
          <i className="ri-shield-check-line mr-2 text-green-500"></i>
          <span>Secure checkout powered by Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
