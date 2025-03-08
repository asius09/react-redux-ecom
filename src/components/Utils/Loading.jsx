import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");

  return (
    <div className="flex justify-center items-center h-full w-full py-8">
      <div className="relative">
        <div
          className={`w-12 h-12 rounded-full border-4 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-t-transparent border-b-transparent animate-spin`}
        ></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <i className="ri-shopping-bag-line text-xl text-indigo-600 animate-pulse"></i>
        </div>
      </div>
    </div>
  );
};

export default Loading;
