import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ReviewForm = ({ productId, onSubmit }) => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    onSubmit({
      productId,
      rating,
      text: reviewText,
      name,
      date: new Date().toISOString(),
    });
    // Reset form
    setRating(0);
    setReviewText("");
    setName("");
  };

  return (
    <div className={`mt-8 ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Your Rating</label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <i
                  className={`text-2xl ${
                    star <= (hoverRating || rating)
                      ? "ri-star-fill text-yellow-400"
                      : "ri-star-line text-gray-400"
                  }`}
                ></i>
              </button>
            ))}
            <span className="ml-2 text-sm">
              {rating > 0 ? `${rating} out of 5` : "Select rating"}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`w-full px-4 py-2 rounded-lg border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="review" className="block mb-2 text-sm font-medium">
            Your Review
          </label>
          <textarea
            id="review"
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            className={`w-full px-4 py-2 rounded-lg border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="Share your experience with this product..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;