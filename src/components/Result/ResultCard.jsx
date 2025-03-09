import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../feature/ecom/cartSlice";
import { useNavigate } from "react-router";

const ResultCard = ({ result }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addProduct(result));
    navigate("/cart/user");
  };

  const handleBuyNow = () => {
    dispatch(addProduct(result));
    navigate("/cart/user");
  };
  
  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex flex-row">
        <div className="relative w-1/3 h-40 bg-gray-200">
          {result.images && result.images.length > 0 ? (
            <img
              src={result.images[0]}
              alt={result.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="ri-image-line text-3xl text-gray-400"></i>
            </div>
          )}
          <div
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
              isDarkMode ? "bg-indigo-600" : "bg-indigo-500"
            } text-white`}
          >
            ${result.price?.toFixed(2)}
          </div>
          {result.stock <= 5 && (
            <div className="absolute bottom-2 left-2 px-2 py-1 text-xs font-semibold rounded bg-red-500 text-white">
              {result.availabilityStatus || "Low Stock"}
            </div>
          )}
        </div>
        <div className="p-4 w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-lg truncate">
                {result.title}
              </h3>
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {result.brand}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {result.category}
              </span>
              {result.rating && (
                <span className="ml-2 flex items-center text-xs">
                  <i className="ri-star-fill text-yellow-400 mr-1"></i>
                  {result.rating}
                </span>
              )}
            </div>
            <p
              className={`text-sm mb-3 line-clamp-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {result.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <button
              onClick={handleAddToCart}
              className={`py-2 rounded-md text-sm ${
                isDarkMode
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white flex items-center justify-center`}
            >
              <i className="ri-shopping-cart-line mr-1"></i>
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className={`py-2 rounded-md text-sm ${
                isDarkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white flex items-center justify-center`}
            >
              <i className="ri-shopping-bag-line mr-1"></i>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
