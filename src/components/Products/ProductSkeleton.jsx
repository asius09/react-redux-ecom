import React from "react";
import { useSelector } from "react-redux";

const ProductSkeleton = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 h-[480px] w-full ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="block h-[220px]">
        <div className="relative h-full w-full bg-gray-300 animate-pulse"></div>
      </div>

      <div className="p-4 h-[260px] flex flex-col">
        <div className="h-[50px] mb-1">
          <div className="h-6 bg-gray-300 rounded animate-pulse w-3/4"></div>
        </div>

        <div className="flex justify-between items-center mb-3 h-[30px]">
          <div className="h-7 bg-gray-300 rounded animate-pulse w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse w-1/5"></div>
        </div>

        <div className="flex items-center mb-4 h-[24px]">
          <div className="h-4 bg-gray-300 rounded animate-pulse w-1/6"></div>
          <div className="ml-auto h-4 bg-gray-300 rounded animate-pulse w-1/4"></div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto h-[40px]">
          <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
