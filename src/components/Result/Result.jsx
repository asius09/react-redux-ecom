import React, { useState } from "react";
import { useSelector } from "react-redux";
import ResultCard from "./ResultCard";
import ResultFilter from "./ResultFilter";
import Loading from "../Utils/Loading";

const Result = ({ reviews }) => {
  console.log(reviews);
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const initialResults = [
    {
      id: 1,
      title: "Wireless Headphones",
      status: "success",
      description:
        "Premium noise-cancelling wireless headphones with 30-hour battery life",
      date: "2023-05-15",
      price: 199.99,
    },
    {
      id: 2,
      title: "Smart Watch",
      status: "success",
      description:
        "Fitness tracker with heart rate monitoring and sleep analysis",
      date: "2023-05-20",
      price: 149.99,
    },
    {
      id: 3,
      title: "Portable Charger",
      status: "failed",
      description: "20000mAh power bank with fast charging capability",
      date: "2023-05-18",
      price: 49.99,
    },
  ];

  useState(() => {
    setFilteredResults(initialResults);
  }, []);

  const applyFilters = (filters) => {
    setLoading(true);

    setTimeout(() => {
      let results = [...initialResults];

      if (filters.searchTerm) {
        results = results.filter(
          (item) =>
            item.title
              .toLowerCase()
              .includes(filters.searchTerm.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(filters.searchTerm.toLowerCase())
        );
      }

      if (filters.minPrice) {
        results = results.filter(
          (item) => item.price >= parseFloat(filters.minPrice)
        );
      }

      if (filters.maxPrice) {
        results = results.filter(
          (item) => item.price <= parseFloat(filters.maxPrice)
        );
      }

      if (filters.status) {
        results = results.filter((item) => item.status === filters.status);
      }

      setFilteredResults(results);
      setLoading(false);
    }, 500);
  };

  return (
    <div
      className={`pt-24 pb-10 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Search Results</h2>
            <p
              className={`text-sm mt-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Found {filteredResults?.length || 0} results matching your
              criteria
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors flex items-center`}
          >
            <i className="ri-filter-3-line mr-2"></i>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {showFilters && <ResultFilter applyFilters={applyFilters} />}

        {loading ? (
          <Loading />
        ) : filteredResults && filteredResults.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {filteredResults.map((result) => (
              <div key={result.id || result.title} className="w-full">
                <ResultCard result={result} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <i className="ri-search-line text-6xl mb-6 text-gray-400"></i>
            <h3 className="text-2xl font-semibold mb-3">No results found</h3>
            <p
              className={`text-center max-w-md ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Try adjusting your search criteria or browse our categories
            </p>
            <button
              className={`mt-6 px-6 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white transition-colors`}
              onClick={() => (window.location.href = "/products")}
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
