import React from "react";
import { useSelector } from "react-redux";

const SidePanel = ({ tabs, activeTab, setActiveTab, onLogout }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  return (
    <div
      className={`w-full h-full md:w-64 shrink-0 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-xl shadow-lg p-4 flex flex-col`}
    >
      <nav className="flex-grow">
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                  activeTab === tab.id
                    ? `bg-indigo-500 text-white`
                    : `${
                        isDarkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                } transition-colors`}
              >
                <i className={`${tab.icon} mr-3 text-lg`}></i>
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
            isDarkMode
              ? "text-red-400 hover:bg-gray-700"
              : "text-red-500 hover:bg-gray-100"
          } transition-colors`}
        >
          <i className="ri-logout-box-line mr-3 text-lg"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
