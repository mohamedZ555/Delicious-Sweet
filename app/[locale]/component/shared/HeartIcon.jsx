"use client";

import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useAuth } from "../../../../context/authContext";

export default function HeartIcon({
  productId,
  className = "",
  onToggle,
  isLiked,
  showTooltip = true,
}) {
  const [isHeartFilled, setIsHeartFilled] = useState(isLiked);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("heartIcon");
  const { isLoggedIn } = useAuth();

  // Update local state when prop changes
  useEffect(() => {
    setIsHeartFilled(isLiked);
  }, [isLiked]);

  const handleClick = async () => {
    if (isLoading || !onToggle) return; // Prevent multiple clicks while loading

    if (!isLoggedIn) {
      setIsHeartFilled(false);
      // Optionally, show a message or redirect to login here
      return;
    }

    setIsLoading(true);

    try {
      // Use the provided onToggle function
      await onToggle(productId);

      // Show success feedback
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);

      // Update local state
      setIsHeartFilled(!isHeartFilled);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
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