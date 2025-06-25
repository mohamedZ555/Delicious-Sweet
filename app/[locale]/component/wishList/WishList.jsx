"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import { useAddToCart } from "../../../../context/authContext";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  FaHeart,
  FaEye,
  FaTrash,
  FaShoppingCart,
  FaSpinner,
  FaLock,
} from "react-icons/fa";
import "../../../../styles/pagesStyle/wishlist.css";
import ConfirmModal from "../shared/ConfirmModal";

function WishList({ local }) {
  const t = useTranslations("wishlist");
  const { isLoggedIn, toggleWishlist, clearWishlistError, clearWishlist } =
    useAuth();
  const { addToCart, isAddingToCart, clearAddToCartError } = useAddToCart();

  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingProductId, setAddingProductId] = useState(null);
  const [removingProductId, setRemovingProductId] = useState(null);
  const [clearingWishlist, setClearingWishlist] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!isLoggedIn) {
        setWishlistProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token available");
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

        if (response.ok) {
          const products = await response.json();
          setWishlistProducts(products.data || []);
        } else {
          if (response.status === 401) {
            throw new Error("Unauthorized - Please login again");
          }
          const errorMessage = `Failed to fetch wishlist products (${response.status})`;
          setError(errorMessage);
          console.error(errorMessage);
          setWishlistProducts([]);
        }
      } catch (error) {
        const errorMessage =
          error.message || "Network error while fetching wishlist products";
        setError(errorMessage);
        console.error(errorMessage, error);
        setWishlistProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [isLoggedIn]);

  const handleAddToCart = async (productId) => {
    setAddingProductId(productId);
    clearAddToCartError();

    const result = await addToCart(productId, 1);

    if (result.success) {
    }

    setAddingProductId(null);
  };

  const handleRemoveFromWishlist = async (productId) => {
    setRemovingProductId(productId);
    clearWishlistError();

    try {
      const result = await toggleWishlist(productId);
      if (result && result.success) {
        // Remove the product from the local state
        setWishlistProducts((prev) =>
          prev.filter((product) => product.productId !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    } finally {
      setRemovingProductId(null);
    }
  };

  const handleClearWishlist = () => {
    setShowConfirmModal(true);
  };

  const confirmClearWishlist = async () => {
    setClearingWishlist(true);
    clearWishlistError();
    setShowConfirmModal(false);
    const result = await clearWishlist();
    if (result.success) {
      setWishlistProducts([]);
    }
    setClearingWishlist(false);
  };

  if (loading) {
    return (
      <div className="wishlistContainer">
        <div className="wishlistLoadingState">
          <div className="text-center">
            <FaSpinner
              className="spinner-border text-primary mb-3"
              style={{ fontSize: "3rem" }}
            />
            <p className="text-muted">{t("loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="wishlistContainer">
        <div className="wishlistLoginState">
          <div className="text-center">
            <FaLock className="wishlistLoginIcon" />
            <h3 className="wishlistLoginTitle">{t("loginRequired")}</h3>
            <p className="wishlistLoginDescription">
              {t("loginRequiredDescription")}
            </p>
            <Link href="/login" className="btn BGPink">
              <i className="fas fa-sign-in-alt me-2"></i>
              {t("login")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="wishlistContainer">
        <div className="wishlistEmptyState">
          <div className="text-center">
            <FaHeart className="wishlistEmptyIcon" />
            <h3 className="wishlistEmptyTitle">{t("emptyTitle")}</h3>
            <p className="wishlistEmptyDescription">{t("emptyDescription")}</p>
            <Link href="/product" className="btn BGPink">
              <FaShoppingCart className="me-2" />
              {t("browseProducts")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlistContainer">
      <ConfirmModal
        isOpen={showConfirmModal}
        title={t("clearAll")}
        message={t("clearAllConfirm")}
        onConfirm={confirmClearWishlist}
        onCancel={() => setShowConfirmModal(false)}
      />
      {/* Header Section */}
      <div className="wishlistHeader">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="wishlistTitle">{t("title")}</h1>
              <p className="wishlistSubtitle">
                {wishlistProducts.length}{" "}
                {wishlistProducts.length === 1 ? t("item") : t("items")}{" "}
                {t("inWishlist")}
              </p>
            </div>
            <div className="col-md-4 text-md-end">
              <button
                onClick={handleClearWishlist}
                disabled={clearingWishlist}
                className="wishlistClearBtn"
                title="Clear all items from wishlist"
              >
                {clearingWishlist ? (
                  <>
                    <FaSpinner className="fa-spin me-2" />
                    Clearing...
                  </>
                ) : (
                  <>
                    <FaTrash className="mx-2" />
                    {t("clearAll")}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {/* Products Grid */}
        <div className="row">
          {wishlistProducts.map((product) => (
            <div
              key={product.productId}
              className="col-lg-4 col-md-6 col-12 mb-4"
            >
              <div
                className={`wishlistCard ${
                  removingProductId === product.productId ? "loading" : ""
                }`}
              >
                <div className="wishlistImageContainer">
                  <img
                    src={product.imageUrl}
                    className="wishlistImage"
                    alt={product.productNameEn}
                    onError={(e) => {
                      e.target.src = "/images/imagePlaceHolder.jpg";
                    }}
                  />

                  {/* Action Buttons */}
                  <div className="wishlistActions">
                    <button
                      className="wishlistActionBtn remove"
                      onClick={() =>
                        handleRemoveFromWishlist(product.productId)
                      }
                      disabled={removingProductId === product.productId}
                      title={t("removeFromWishlist")}
                    >
                      {removingProductId === product.productId ? (
                        <FaSpinner className="fa-spin" />
                      ) : (
                        <FaHeart />
                      )}
                    </button>

                    <Link
                      href={`/product/${product.productId}`}
                      className="wishlistActionBtn view"
                      title={t("viewDetails")}
                    >
                      <FaEye />
                    </Link>
                  </div>
                </div>

                <div className="wishlistCardBody">
                  <h5 className="wishlistProductTitle">
                    {local === "en" ? product.productNameEn : product.productNameAr === null ? product.productNameEn : product.productNameAr}
                  </h5>

                  <div className="wishlistPrice">${product.itemPrice}</div>
                  {product.brandNameEn && (
                    <div className="wishlistBrand">
                      {t("brand")}: {local === "en" ? product.brandNameEn : product.brandNameAr}
                    </div>
                  )}
                  <button
                    className={`wishlistAddToCartBtn ${
                      addingProductId === product.productId || product.quantityInStock === 0 ? "loading" : ""
                    }`}
                    onClick={() => handleAddToCart(product.productId)}
                    style={{
                      cursor: addingProductId === product.productId || product.quantityInStock === 0 ? "not-allowed" : "pointer",
                      opacity: addingProductId === product.productId || product.quantityInStock === 0 ? 0.7 : 1,
                    }}
                    disabled={
                      addingProductId === product.productId || isAddingToCart || product.quantityInStock === 0
                    }
                  >
                    {addingProductId === product.productId || product.quantityInStock === 0 ? (
                      <>
                        <FaSpinner className="fa-spin me-2" />
                        {t("addingToCart")}
                      </>
                    ) : (
                      <>
                        <FaShoppingCart className="me-2" />
                        {t("addToCart")}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishList;
