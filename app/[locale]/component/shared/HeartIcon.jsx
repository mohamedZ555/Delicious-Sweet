"use client";

import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function HeartIcon({
  productId,
  className = "",
  onToggle,
  isLiked: initialIsLiked = false,
  showTooltip = true,
}) {
  const [isHeartFilled, setIsHeartFilled] = useState(initialIsLiked);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("heartIcon");

  // Update local state when prop changes
  useEffect(() => {
    setIsHeartFilled(initialIsLiked);
  }, [initialIsLiked]);

  const handleClick = async () => {
    if (isLoading || !onToggle) return; // Prevent multiple clicks while loading

    setIsLoading(true);

    try {
      // Use the provided onToggle function
      await onToggle(productId, isHeartFilled);

      // Show success feedback
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);

      // Update local state
      setIsHeartFilled(!isHeartFilled);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTooltipText = () => {
    if (isHeartFilled) return t("removeFromWishlist");
    return t("addToWishlist");
  };

  return (
    <div className="position-relative">
      <div
        className={`hearBTN d-flex align-items-center justify-content-center`}
        onClick={handleClick}
        style={{
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.7 : 1,
        }}
        title={!showTooltip ? "" : getTooltipText()}
      >
        <FaHeart
          className={`${isHeartFilled ? "text-danger" : "text-white"} ${
            isLoading ? "opacity-50" : ""
          }`}
          style={{
            filter: isHeartFilled
              ? "drop-shadow(0 0 2px rgba(220, 53, 69, 0.5))"
              : "drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))",
          }}
        />
      </div>

    </div>
  );
} 