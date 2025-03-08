import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewForm from "./ReviewForm";
import ReviewPost from "./ReviewPost";

const Review = ({ reviews = [] }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const [localReviews, setLocalReviews] = useState(reviews);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [visibleReviews, setVisibleReviews] = useState(5);

  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  const handleSubmitReview = (reviewData) => {
    const newReview = {
      id: Date.now(),
      username: reviewData.name || "Anonymous User",
      rating: reviewData.rating,
      content: reviewData.text,
      date: reviewData.date,
      helpfulCount: 0,
    };

    setLocalReviews([newReview, ...localReviews]);
    // In a real app, you would post this to an API
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);

    const sortedReviews = [...localReviews];
    if (sortValue === "newest") {
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortValue === "highest") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortValue === "lowest") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    }

    setLocalReviews(sortedReviews);
  };

  const loadMoreReviews = () => {
    setVisibleReviews((prevCount) => prevCount + 5);
  };

  const averageRating =
    localReviews.length > 0
      ? (
          localReviews.reduce((acc, review) => acc + review.rating, 0) /
          localReviews.length
        ).toFixed(1)
      : "0.0";

  const ratingDistribution = {
    5: localReviews.filter((r) => r.rating === 5).length,
    4: localReviews.filter((r) => r.rating === 4).length,
    3: localReviews.filter((r) => r.rating === 3).length,
    2: localReviews.filter((r) => r.rating === 2).length,
    1: localReviews.filter((r) => r.rating === 1).length,
  };

  const textColor = isDarkMode ? "text-gray-100" : "text-gray-800";
  const bgColor = isDarkMode ? "bg-gray-800" : "bg-gray-50";
  const cardBg = isDarkMode ? "bg-gray-700" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200";

  return (
    <div
      className={`h-full pt-8 ${bgColor} rounded-lg p-6 shadow-lg transition-colors duration-300`}
    >
      <h2 className={`text-2xl font-bold mb-8 ${textColor} flex items-center`}>
        <i className="ri-chat-quote-line mr-2 text-indigo-500"></i> Customer
        Reviews
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`col-span-1 flex flex-col items-center justify-center p-6 rounded-xl shadow-sm ${cardBg} border ${borderColor}`}
            >
              <span className={`text-5xl font-bold ${textColor}`}>
                {averageRating}
              </span>
              <div className="flex my-3">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`text-xl ${
                      i < Math.round(averageRating)
                        ? "ri-star-fill text-yellow-400"
                        : "ri-star-line text-gray-400"
                    }`}
                  ></i>
                ))}
              </div>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Based on {localReviews.length}{" "}
                {localReviews.length === 1 ? "review" : "reviews"}
              </span>
            </div>

            <div
              className={`col-span-2 p-6 rounded-xl shadow-sm ${cardBg} border ${borderColor}`}
            >
              <div
                className={`text-sm font-medium mb-5 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Rating Distribution
              </div>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center mb-3">
                  <div className="w-12 text-sm font-medium">{rating} stars</div>
                  <div className="flex-1 mx-3">
                    <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            localReviews.length
                              ? (ratingDistribution[rating] /
                                  localReviews.length) *
                                100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-sm font-medium text-right">
                    {ratingDistribution[rating]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`mb-8 p-6 rounded-xl shadow-sm ${cardBg} border ${borderColor}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                <i className="ri-edit-line mr-2 text-indigo-500"></i>
                Add Your Review
              </h3>

              {localReviews.length > 0 && (
                <div className="flex items-center">
                  <label
                    htmlFor="sort-by"
                    className={`mr-2 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={handleSortChange}
                    className={`rounded-md text-sm py-2 px-3 ${
                      isDarkMode
                        ? "bg-gray-600 text-gray-200 border-gray-500"
                        : "bg-white text-gray-700 border-gray-300"
                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                  >
                    <option value="newest">Newest</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>
              )}
            </div>

            <ReviewForm onSubmit={handleSubmitReview} />
          </div>

          <div
            className={`mt-10 p-6 rounded-xl shadow-sm ${cardBg} border ${borderColor}`}
          >
            <h3
              className={`text-xl font-semibold mb-6 flex items-center ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <i className="ri-chat-1-line mr-2 text-indigo-500"></i>
              {localReviews.length > 0 ? "Recent Reviews" : "No reviews yet"}
            </h3>

            {localReviews.length === 0 && (
              <div
                className={`text-center py-10 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <i className="ri-chat-off-line text-4xl mb-3"></i>
                <p>Be the first to leave a review!</p>
              </div>
            )}

            <div className="space-y-5">
              {localReviews.slice(0, visibleReviews).map((review) => (
                <ReviewPost key={review.id} review={review} />
              ))}
            </div>

            {localReviews.length > visibleReviews && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMoreReviews}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    isDarkMode
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                  }`}
                >
                  <i className="ri-arrow-down-line mr-1"></i> Load More Reviews
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
