"use client";
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import "../../../../styles/globals.css"

export default function StarRating({ 
  productId, 
  currentRating = 0, 
  onNewReview, 
  reviews = [], 
  showReviewForm = true 
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const t = useTranslations("starRating");

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      alert(t("loginToReview"));
      return;
    }
    if (rating === 0) {
      alert(t("selectRating") || "Please select a rating");
      return;
    }
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Reviews/AddReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: productId,
          rating: rating,
          comment: newComment || t("noCommentProvided")
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t("failedToSaveRating"));
      }
      // The API should return the new review, but if not, create a compatible object
      const apiReview = await response.json();
      let newReview;
      if (apiReview && apiReview.data) {
        newReview = apiReview.data;
      } else {
        newReview = {
          id: Date.now(),
          rating: rating,
          comment: newComment || t("noCommentProvided"),
          reviewDate: new Date().toISOString(),
          user: { firstName: "You", lastName: "" }
        };
      }
      if (onNewReview) {
        onNewReview(newReview);
      }
      setRating(0);
      setNewComment('');
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="star-rating-container">
      {showReviewForm && (
        <div className="review-form-section mb-4">
          <h3 className="mb-4">{t("addReview")}</h3>
          {!showForm ? (
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              {t("addReview")}
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              <div className="stars-container mb-3">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className="star"
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setRating(ratingValue)}
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    />
                  );
                })}
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t("commentPlaceholder")}
                />
              </div>
              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting || rating === 0}
                >
                  {isSubmitting ? t("submitting") : t("submit")}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setRating(0);
                    setNewComment('');
                  }}
                >
                  {t("cancel")}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      <div className="reviews-section ">
        <h4 className="mb-3">{t("reviews")}</h4>
        {reviews.length === 0 ? (
          <p className="text-muted">{t("noReviews")}</p>
        ) : (
          <div className="reviews-list d-flex flex-column-reverse ">
            {reviews.map((review, index) => {
              // Support both API and local review formats
              const user = review.user || {};
              const userName = user.firstName 
                ? `${user.firstName} ${user.lastName || ''}`.trim()
                : (typeof user === 'string' ? user : 'Anonymous');
              const date = review.reviewDate || review.createdAt;
              return (
                <div key={review.id || index} className="review-item border p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h4>
                        {userName || ""}
                      </h4>
                      <div className="stars-display d-flex align-items-center gap-1 mb-2 mt-3">
                        {[...Array(5)].map((_, starIndex) => (
                          <FaStar
                            key={starIndex}
                            color={starIndex < review.rating ? "#ffc107" : "#e4e5e9"}
                            style={{ fontSize: '22px' }}
                          />
                        ))}
                      </div>
                    </div>
                    <small className="text-muted">
                      {formatDate(date)}
                    </small>
                  </div>
                  <h5 className="mb-0 text-muted text-capitalize">{review.comment}</h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}