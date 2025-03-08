import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { addProduct } from "../../feature/ecom/cartSlice";

const Home = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleAddToCart = (product) => {
    dispatch(addProduct({ ...product, id: Date.now() }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail("");
    }
  };

  return (
    <div
      className={`pt-24 pb-10 px-6 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <section className="py-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              Welcome
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Products
            </h1>
            <p
              className={`max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Shop the latest trends and essentials with our curated collection
              of high-quality products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div
              className={`p-8 rounded-xl ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-750"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <i className="ri-shopping-bag-line text-5xl mb-5 text-indigo-500"></i>
              <h2 className="text-2xl font-semibold mb-3">New Arrivals</h2>
              <p
                className={`mb-5 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Explore our freshest products and stay ahead of the trends.
              </p>
              <button
                onClick={() => handleAddToCart(products[0])}
                className={`w-full px-5 py-3 rounded-lg font-medium ${
                  isDarkMode
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-500 hover:bg-indigo-600"
                } text-white flex items-center justify-center gap-2 transition-colors`}
              >
                Browse Collection <i className="ri-arrow-right-line"></i>
              </button>
            </div>

            <div
              className={`p-8 rounded-xl ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-750"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <i className="ri-price-tag-3-line text-5xl mb-5 text-rose-500"></i>
              <h2 className="text-2xl font-semibold mb-3">Special Offers</h2>
              <p
                className={`mb-5 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Limited-time deals with amazing discounts on popular items.
              </p>
              <button
                onClick={() => handleAddToCart(products[0])}
                className={`w-full px-5 py-3 rounded-lg font-medium ${
                  isDarkMode
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-rose-500 hover:bg-rose-600"
                } text-white flex items-center justify-center gap-2 transition-colors`}
              >
                View Deals <i className="ri-arrow-right-line"></i>
              </button>
            </div>

            <div
              className={`p-8 rounded-xl ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-750"
                  : "bg-white hover:bg-gray-50"
              } shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <i className="ri-star-line text-5xl mb-5 text-amber-500"></i>
              <h2 className="text-2xl font-semibold mb-3">Best Sellers</h2>
              <p
                className={`mb-5 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Discover our most popular and highly-rated products.
              </p>
              <button
                onClick={() => handleAddToCart(products[0])}
                className={`w-full px-5 py-3 rounded-lg font-medium ${
                  isDarkMode
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-amber-500 hover:bg-amber-600"
                } text-white flex items-center justify-center gap-2 transition-colors`}
              >
                Explore <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>

          <div
            className={`p-8 rounded-xl ${
              isDarkMode ? "bg-indigo-900/50" : "bg-indigo-50"
            } mb-8`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-3">Join Our Newsletter</h2>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  Get updates on new products and exclusive offers.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="w-full md:w-1/3 flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className={`flex-1 px-4 py-2 rounded-l-lg border-2 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                  <i className="ri-send-plane-fill"></i>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
