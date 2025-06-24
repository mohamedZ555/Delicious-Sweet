"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../../../context/authContext";

export default function WishlistBadge() {
  const { getWishlistCount, isLoggedIn } = useAuth();
  const wishlistCount = getWishlistCount();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Link href="/wishlist" className="position-relative text-decoration-none">
      <FaRegHeart className="text-black fs-5" />
      {wishlistCount > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{
            fontSize: "0.6rem",
            transform: "translate(-50%, -50%)",
          }}
        >
          {wishlistCount > 99 ? "99+" : wishlistCount}
        </span>
      )}
    </Link>
  );
} 