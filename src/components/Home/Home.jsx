import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { addProduct } from "../../feature/ecom/cartSlice";
import HomeCard from "../Home/HomeCard";
import Loading from "../Utils/Loading";

const Home = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addProduct({ ...product, id: Date.now() }));
    // Show toast notification
    const notification = document.getElementById("notification");
    notification.classList.remove("translate-y-full");
    setTimeout(() => notification.classList.add("translate-y-full"), 3000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail("");
    }
  };

  return (
    <>
      <div
        className={`pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10 px-4 sm:px-6 min-h-screen ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div className="max-w-7xl mx-auto">
            <section className="py-4 sm:py-6 md:py-8">
              <div className="text-center mb-8 sm:mb-10 md:mb-16 animate-fadeIn">
                <span className="inline-block bg-indigo-100 text-indigo-600 px-2 sm:px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-semibold mb-2 sm:mb-3 md:mb-4 shadow-sm">
                  Welcome to EcomStore
                </span>
                <h1 className="pb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  Discover Amazing Products
                </h1>
                <p
                  className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Shop the latest trends and essentials with our curated
                  collection of high-quality products.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10 mb-8 sm:mb-10 md:mb-16">
                {[
                  {
                    icon: "ri-shopping-bag-line",
                    title: "New Arrivals",
                    description:
                      "Explore our freshest products and stay ahead of the trends.",
                    buttonText: "Browse Collection",
                    productIndex: 1,
                    iconColor: "text-indigo-500",
                    buttonColor: "bg-indigo-500 hover:bg-indigo-600",
                    buttonDarkColor: "bg-indigo-600 hover:bg-indigo-700",
                  },
                  {
                    icon: "ri-price-tag-3-line",
                    title: "Special Offers",
                    description:
                      "Limited-time deals with amazing discounts on popular items.",
                    buttonText: "View Deals",
                    productIndex: 0,
                    iconColor: "text-rose-500",
                    buttonColor: "bg-rose-500 hover:bg-rose-600",
                    buttonDarkColor: "bg-rose-600 hover:bg-rose-700",
                  },
                  {
                    icon: "ri-star-line",
                    title: "Best Sellers",
                    description:
                      "Discover our most popular and highly-rated products.",
                    buttonText: "Explore",
                    productIndex: 2,
                    iconColor: "text-amber-500",
                    buttonColor: "bg-amber-500 hover:bg-amber-600",
                    buttonDarkColor: "bg-amber-600 hover:bg-amber-700",
                  },
                ].map((card, index) => (
                  <div
                    key={index}
                    className="transform hover:scale-105 transition-all duration-300"
                  >
                    <HomeCard
                      icon={card.icon}
                      title={card.title}
                      description={card.description}
                      buttonText={card.buttonText}
                      onClick={() =>
                        handleAddToCart(products[card.productIndex])
                      }
                      iconColor={card.iconColor}
                      buttonColor={card.buttonColor}
                      buttonDarkColor={card.buttonDarkColor}
                    />
                  </div>
                ))}
              </div>

              <div
                className={`p-4 sm:p-6 md:p-10 rounded-lg sm:rounded-xl md:rounded-2xl ${
                  isDarkMode
                    ? "bg-gradient-to-r from-indigo-900/50 to-purple-900/30"
                    : "bg-gradient-to-r from-indigo-50 to-purple-50"
                } mb-6 sm:mb-8 backdrop-blur-sm shadow-lg sm:shadow-xl border ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">
                  <div className="w-full md:w-2/3">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                      Join Our Newsletter
                    </h2>
                    <p
                      className={`text-sm sm:text-base md:text-lg ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Get updates on new products and exclusive offers directly
                      to your inbox.
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubscribe}
                    className="w-full md:w-1/3 flex mt-4 md:mt-0"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className={`flex-1 px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded-l-lg border-2 ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base md:text-lg`}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded-r-lg transition-colors text-sm sm:text-base md:text-lg"
                    >
                      <i className="ri-send-plane-fill"></i>
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
