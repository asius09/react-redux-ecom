import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../feature/ecom/cartSlice";

const ResultCard = ({ result }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProduct({ ...result, id: Date.now() }));
  };

  const handleBuyNow = () => {
    dispatch(addProduct({ ...result, id: Date.now() }));
    window.location.href = "/cart";
  };

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex flex-row">
        <div className="relative w-1/3 h-40 bg-gray-200">
          <img 
            src={result.image || "https://via.placeholder.com/300x200"} 
            alt={result.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
            isDarkMode ? "bg-indigo-600" : "bg-indigo-500"
          } text-white`}>
            ${result.price?.toFixed(2)}
          </div>
        </div>
        <div className="p-4 w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-2 truncate">{result.title}</h3>
            <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {result.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <button 
              onClick={handleAddToCart}
              className={`py-2 rounded-md text-sm ${
                isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"
              } text-white flex items-center justify-center`}
            >
              <i className="ri-shopping-cart-line mr-1"></i>
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className={`py-2 rounded-md text-sm ${
                isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
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
