import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { fetchResults } from "../../feature/ecom/resultSlice";
import ResultCard from "./ResultCard";
import Loading from "../Utils/Loading";

const Result = () => {
  const { search } = useParams();
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const { items, loading, error } = useSelector((state) => state.result);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchResults(search));
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800); // Wait for 800ms to show loading state

    return () => clearTimeout(timer);
  }, [dispatch, search]);

  return (
    <div
      className={`pt-24 pb-10 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Search Results for {search}</h2>
            <p
              className={`text-sm mt-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Found {items?.length || 0} results matching your criteria
            </p>
          </div>
          {/* <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors flex items-center`}
          >
            <i className="ri-filter-3-line mr-2"></i>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button> */}
        </div>

        {/* {showFilters && <ResultFilter applyFilters={applyFilters} />} */}

        {/* Search Result Container */}
        {loading || isInitialLoading ? (
          <Loading />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <i className="ri-error-warning-line text-6xl mb-6 text-red-500"></i>
            <h3 className="text-2xl font-semibold mb-3">
              Error loading results
            </h3>
            <p
              className={`text-center max-w-md ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {error.message || "Something went wrong. Please try again later."}
            </p>
            <button
              className={`mt-6 px-6 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white transition-colors`}
              onClick={() => dispatch(fetchResults(search))}
            >
              Try Again
            </button>
          </div>
        ) : items && items.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {items.map((result) => (
              <div key={result.key} className="w-full">
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
              onClick={() => navigate("/products")}
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
