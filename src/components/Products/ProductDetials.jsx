import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addProduct } from "../../feature/ecom/cartSlice";
import Review from "../Review/Review";
import { useNavigate } from "react-router";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const { items } = useSelector((state) => state.products);

  const product = items.find((item) => item.key === productId);

  if (!product) {
    return (
      <div
        className={`container mx-auto px-4 py-16 mt-24 ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        <div className="text-center py-20 max-w-lg mx-auto">
          <i className="ri-error-warning-line text-6xl text-red-500 mb-6"></i>
          <h2 className="text-3xl font-bold mb-4">Product not found</h2>
          <p className="text-lg opacity-80 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/products"
            className={`inline-block px-6 py-3 rounded-lg ${
              isDarkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-500 hover:bg-indigo-600"
            } text-white transition-all duration-300`}
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addProduct(product));
  };

  const handleBuyNow = () => {
    dispatch(addProduct(product));
    navigate("/cart/user");
  };

  return (
    <div
      className={`container mx-auto px-4 py-12 mt-24 ${
        isDarkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-10 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-xl overflow-hidden p-6 mb-12 transition-all duration-300`}
      >
        {/* Product Images */}
        <div className="space-y-6">
          <div
            className={`h-96 flex items-center justify-center ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            } rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md`}
          >
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImage]}
                alt={product.title || product.name}
                className="h-full object-contain p-4"
              />
            ) : (
              <i className="ri-shopping-bag-line text-8xl text-gray-400"></i>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images &&
              product.images.map((image, index) => (
                <div
                  key={index}
                  className={`h-24 flex items-center justify-center ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-50"
                  } rounded-lg cursor-pointer transition-all duration-200 hover:opacity-90 ${
                    selectedImage === index
                      ? "ring-2 ring-indigo-500 shadow-md"
                      : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title || product.name} - view ${index + 1}`}
                    className="h-full object-contain p-2"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            {product.category && (
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                } inline-block mb-3`}
              >
                {product.category}
              </span>
            )}
            <h1 className="text-3xl font-bold mb-3 leading-tight">
              {product.title || product.name}
            </h1>
            <div className="flex items-center mb-5">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => {
                  const rating = product.rating || 4.5;
                  return (
                    <i
                      key={index}
                      className={`${
                        index < Math.floor(rating)
                          ? "ri-star-fill"
                          : index < rating
                          ? "ri-star-half-fill"
                          : "ri-star-line"
                      } text-lg`}
                    ></i>
                  );
                })}
              </div>
              <span
                className={`ml-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                ({product.reviewCount || 0} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline mb-6">
            <div className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </div>
            {product.discountPercentage && (
              <div className="ml-3">
                <span className="text-lg line-through opacity-60">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
                <span className="ml-2 text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded-md">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </div>
            )}
          </div>

          <p
            className={`mb-6 text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {product.description}
          </p>

          {product.features && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul
                className={`space-y-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-2 mt-1"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className={`mb-6 p-4 rounded-lg border border-opacity-20 ${
              isDarkMode
                ? "bg-gray-700 bg-opacity-50 border-gray-600"
                : "bg-gray-100 bg-opacity-50 border-gray-300"
            }`}
          >
            <div className="flex items-center mb-2">
              <i
                className={`ri-truck-line mr-2 ${
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              ></i>
              <span className="font-medium mr-2">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-500 font-medium">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-500 font-medium">Out of Stock</span>
              )}
            </div>
            {product.brand && (
              <div className="flex items-center">
                <i className="ri-store-2-line mr-2 text-indigo-500"></i>
                <span className="font-medium mr-2">Brand:</span>
                <span>{product.brand}</span>
              </div>
            )}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-4">
            <button
              onClick={handleAddToCart}
              className={`py-4 rounded-lg transition-all duration-300 flex items-center justify-center font-medium ${
                product.stock <= 0
                  ? "opacity-50 cursor-not-allowed bg-gray-500 text-white"
                  : `${
                      isDarkMode
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    } text-white hover:shadow-lg`
              }`}
              disabled={product.stock <= 0}
            >
              <i className="ri-shopping-cart-line mr-2 text-lg"></i>
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className={`py-4 rounded-lg transition-all duration-300 flex items-center justify-center font-medium ${
                product.stock <= 0
                  ? "opacity-50 cursor-not-allowed bg-gray-500 text-white"
                  : `${
                      isDarkMode
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white hover:shadow-lg`
              }`}
              disabled={product.stock <= 0}
            >
              <i className="ri-shopping-bag-line mr-2 text-lg"></i>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      {product?.reviews?.length > 0 && (
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl shadow-xl p-6 transition-all duration-300`}
        >
          <Review reviews={product.reviews} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
