import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchMoreProducts,
} from "../../feature/ecom/productsSlice";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import Loading from "../Utils/Loading";

const Products = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const { items, error, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleLoadMore = () => {
    if (loading) return;
    dispatch(fetchMoreProducts());
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      const uniqueCategories = [...new Set(items.map((item) => item.category))];
      setCategories(uniqueCategories);
    }
  }, [items]);

  const filteredProducts =
    selectedCategory === "all"
      ? items
      : items.filter((product) => product.category === selectedCategory);

  return (
    <div
      className={`pt-24 pb-10 px-6 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <i className="ri-store-2-line mr-3 text-indigo-600"></i>
          Our Products
        </h1>

        {!loading && !error && categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === "all"
                    ? "bg-indigo-600 text-white"
                    : isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full capitalize transition-colors ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white"
                      : isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div
            className={`p-6 rounded-lg ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-md text-center`}
          >
            <i className="ri-error-warning-line text-red-500 text-5xl mb-4"></i>
            <h2 className="text-xl font-semibold mb-2">
              Error Loading Products
            </h2>
            <p
              className={`${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } mb-4`}
            >
              {error}
            </p>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.key} product={product} />
              ))
            ) : (
              <p
                className={`col-span-3 text-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No products available in this category
              </p>
            )}
          </div>
        )}
      </div>
      {!loading && items.length > 0 ? (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
              isDarkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-500 hover:bg-indigo-600"
            } text-white`}
          >
            Load More Products <i className="ri-arrow-down-line"></i>
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Products;
