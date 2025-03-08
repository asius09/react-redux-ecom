import React from "react";
import { useSelector } from "react-redux";

const ReviewPost = ({ review }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  
  return (
    <div className={`p-4 rounded-lg shadow-md mb-4 transition-all duration-300 ${
      isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
    }`}>
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
          <i className="ri-user-line text-indigo-600"></i>
        </div>
        <div>
          <h3 className="font-semibold">{review?.username || "Anonymous User"}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`text-sm ${
                i < (review?.rating || 0) ? "ri-star-fill text-yellow-400" : "ri-star-line text-gray-400"
              }`}></i>
            ))}
            <span className="text-xs ml-2 text-gray-500 dark:text-gray-400">
              {new Date(review?.date || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
        {review?.content || "No review content provided."}
      </p>
      <div className="flex mt-3 text-xs">
        <button className="flex items-center mr-4 text-gray-500 hover:text-indigo-600">
          <i className="ri-thumb-up-line mr-1"></i> Helpful ({review?.helpfulCount || 0})
        </button>
        <button className="flex items-center text-gray-500 hover:text-indigo-600">
          <i className="ri-reply-line mr-1"></i> Reply
        </button>
      </div>
    </div>
  );
};

export default ReviewPost;
