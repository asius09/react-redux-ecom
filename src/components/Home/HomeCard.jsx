import React from "react";
import { useSelector } from "react-redux";

const HomeCard = ({
  icon = "ri-shopping-bag-line",
  title = "New Arrivals",
  description = "Explore our freshest products and stay ahead of the trends.",
  buttonText = "Browse Collection",
  onClick,
  iconColor = "text-indigo-500",
  buttonColor = "bg-indigo-500 hover:bg-indigo-600",
  buttonDarkColor = "bg-indigo-600 hover:bg-indigo-700",
}) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");

  return (
    <div
      className={`p-8 rounded-xl h-full flex flex-col ${
        isDarkMode
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-white hover:bg-gray-50"
      } shadow-lg transform hover:scale-105 transition-all duration-300`}
    >
      <div className="mb-5">
        <i className={`${icon} text-5xl ${iconColor}`}></i>
      </div>
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p
        className={`mb-5 flex-grow ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {description}
      </p>
      <button
        onClick={onClick}
        className={`w-full px-5 py-3 rounded-lg font-medium ${
          isDarkMode ? buttonDarkColor : buttonColor
        } text-white flex items-center justify-center gap-2 transition-colors`}
      >
        {buttonText} <i className="ri-arrow-right-line"></i>
      </button>
    </div>
  );
};

export default HomeCard;
