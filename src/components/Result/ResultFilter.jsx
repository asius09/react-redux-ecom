import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ResultFilter = ({ applyFilters }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    searchTerm: ""
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPriceExpanded, setIsPriceExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(filters);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      category: "",
      searchTerm: ""
    });
    applyFilters({});
  };

  return (
    <div className={`transition-all duration-300 ${isExpanded ? "w-full" : "w-16"} h-full rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        {isExpanded && <h3 className="text-xl font-semibold">Filter Products</h3>}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
        >
          <i className={`ri-${isExpanded ? 'arrow-left' : 'filter-3'}-line`}></i>
        </button>
      </div>
      
      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto max-h-[calc(100vh-150px)] scrollbar-thin">
          <div className="space-y-5">
            <div>
              <label className={`block mb-2 font-medium text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Search Products
              </label>
              <div className={`flex items-center w-full px-3 py-2 rounded-md border transition-colors ${
                isDarkMode ? "bg-gray-700 border-gray-600 focus-within:border-indigo-500" : "bg-white border-gray-300 focus-within:border-indigo-400"
              }`}>
                <i className="ri-search-line mr-2 text-gray-400"></i>
                <input
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleChange}
                  placeholder="Search by name..."
                  className={`w-full bg-transparent focus:outline-none ${
                    isDarkMode ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                  }`}
                />
                {filters.searchTerm && (
                  <button
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, searchTerm: "" }))}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <button 
                type="button"
                onClick={() => setIsPriceExpanded(!isPriceExpanded)}
                className={`flex justify-between items-center w-full mb-2 font-medium text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                <span>Price Range</span>
                <i className={`ri-arrow-${isPriceExpanded ? 'up' : 'down'}-s-line`}></i>
              </button>
              
              {isPriceExpanded && (
                <div className="flex items-center space-x-2">
                  <div className={`w-1/2 relative rounded-md border ${
                    isDarkMode ? "bg-gray-700 border-gray-600 focus-within:border-indigo-500" : "bg-white border-gray-300 focus-within:border-indigo-400"
                  }`}>
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleChange}
                      placeholder="Min"
                      className={`w-full pl-8 pr-3 py-2 rounded-md bg-transparent focus:outline-none ${
                        isDarkMode ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                      }`}
                    />
                  </div>
                  <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>-</span>
                  <div className={`w-1/2 relative rounded-md border ${
                    isDarkMode ? "bg-gray-700 border-gray-600 focus-within:border-indigo-500" : "bg-white border-gray-300 focus-within:border-indigo-400"
                  }`}>
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleChange}
                      placeholder="Max"
                      className={`w-full pl-8 pr-3 py-2 rounded-md bg-transparent focus:outline-none ${
                        isDarkMode ? "text-white placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className={`block mb-2 font-medium text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Category
              </label>
              <div className={`p-3 rounded-md border ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}>
                <div className="flex flex-col space-y-3">
                  {[
                    { value: "", label: "All Categories", icon: "ri-apps-line" },
                    { value: "electronics", label: "Electronics", icon: "ri-computer-line" },
                    { value: "clothing", label: "Clothing", icon: "ri-t-shirt-line" },
                    { value: "home", label: "Home & Kitchen", icon: "ri-home-line" }
                  ].map((option) => (
                    <label 
                      key={option.value} 
                      className={`flex items-center p-2 rounded-md cursor-pointer ${
                        filters.category === option.value 
                          ? (isDarkMode ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-700") 
                          : (isDarkMode ? "text-gray-200 hover:bg-gray-600" : "text-gray-700 hover:bg-gray-100")
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={option.value}
                        checked={filters.category === option.value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <i className={`${option.icon} mr-2 ${
                        filters.category === option.value ? "text-white" : (isDarkMode ? "text-gray-400" : "text-gray-500")
                      }`}></i>
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className={`flex-1 px-4 py-2.5 rounded-md text-white font-medium transition-colors ${
                  isDarkMode 
                    ? "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800" 
                    : "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700"
                } flex items-center justify-center`}
              >
                <i className="ri-filter-3-line mr-1.5"></i>
                Apply Filters
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-colors ${
                  isDarkMode 
                    ? "bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-gray-300" 
                    : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-700"
                } flex items-center justify-center`}
              >
                <i className="ri-refresh-line mr-1.5"></i>
                Reset
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResultFilter;
