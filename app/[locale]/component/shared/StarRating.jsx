"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "../../../../styles/globals.css"
const StarRating = ({ initialRating = 0, productId, reviews = [], onNewReview }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const t = useTranslations("profile");

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = async (newRating) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to submit a review");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Reviews/AddReview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: productId,
            rating: newRating,
            comment: newComment || "No comment provided",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save rating");
      }

      const responseData = await response.json();
      setRating(responseData.rating);

      // Create new review object
      const newReview = {
        comment: newComment || "No comment provided",
        rating: newRating,
        user: "You",
        reviewDate: new Date().toISOString(),
      };

      // Notify parent component about the new review
      onNewReview(newReview);

      // Reset the form
      setNewComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="border-bottom pb-4">
        <h3 className="mb-4">Add Your Review</h3>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            Your Comment
          </label>
          <textarea
            id="comment"
            className="form-control"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
            placeholder="Share your thoughts about this product..."
          ></textarea>
        </div>

        <div className="d-flex align-items-center gap-3 mb-3">
          <span className="fw-semibold">Your Rating:</span>
          <div className="d-flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="border-0 bg-transparent p-0"
                disabled={isSubmitting}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <FaStar
                  color={
                    hover >= star || (!hover && rating >= star)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  size={24}
                />
              </button>
            ))}
          </div>
          <button
            className="btn btn-primary"
            disabled={isSubmitting || !rating}
            onClick={() => handleRating(rating)}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>

      <div className="pb-4">
        <h3 className="mb-4">Customer Reviews</h3>

        {reviews.length > 0 ? (
          <div className="reviews-container d-flex flex-column-reverse">
            {reviews.map((review, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div className="fw-bold">{review.user}</div>
                    <div className="text-muted small">
                      {formatDate(review.reviewDate)}
                    </div>
                  </div>
                  <div className="d-flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < review?.rating ? "#ffc107" : "#e4e5e9"}
                        size={16}
                      />
                    ))}
                  </div>
                </div>
                <div className="review-comment">{review?.comment}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted">
            No reviews yet. Be the first to review!
          </div>
        )}
      </div>
    </div>
  );
};

export default StarRating;