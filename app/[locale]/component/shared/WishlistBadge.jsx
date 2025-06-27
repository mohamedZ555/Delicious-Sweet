"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../../../context/authContext";

export default function WishlistBadge() {
  const { wishlistVersion } = useAuth();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlistCount() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setWishlistCount(0);
          setLoading(false);
          return;
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/WishList/GetAllByUserId`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch wishlist");
        const res = await response.json();
        setWishlistCount(Array.isArray(res.data) ? res.data.length : 0);
      } catch (error) {
        setWishlistCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlistCount();
  }, [wishlistVersion]);

  return (
    <Link href="/wishlist" className="position-relative text-decoration-none">
      <FaRegHeart className="text-black fs-5" />
      {!loading && wishlistCount > 0 && (
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