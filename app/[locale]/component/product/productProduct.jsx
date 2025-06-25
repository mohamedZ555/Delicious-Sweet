"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SlEye } from "react-icons/sl";
import Stars from "../shared/stars";
import HeartIcon from "../shared/HeartIcon";
import { useAddToCart } from "../../../../context/authContext";
import { useAuth } from "../../../../context/authContext";

import styles from "../../../../styles/pagesStyle/home/flashSales.module.css";

function ProductProduct({ products = [] , locale}) {
  const t = useTranslations("Product");
  const { addToCart, isAddingToCart, addToCartError, clearAddToCartError } =
    useAddToCart();
  const { toggleWishlist, isInWishlist } = useAuth();
  const [addingProductId, setAddingProductId] = useState(null);

  const handleAddToCart = async (productId) => {
    setAddingProductId(productId);
    clearAddToCartError();

    const result = await addToCart(productId, 1);

    setAddingProductId(null);
  };

  const handleWishlistToggle = async (productId, isLiked) => {
    try {
      await toggleWishlist(productId);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <main>
      {/* Error Alert */}

      <div className="row">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              className={`${styles.productCard} col-lg-4 col-md-6 col-12 position-relative rounded overflow-hidden mb-3`}
              key={index}
            >
              <div
                className={`${styles.cartImageCont} rounded position-relative`}
              >
                <img
                  src={product.mainImageUrl}
                  className={`${styles.cardImg} rounded overflow-hidden mb-2`}
                  alt={product.nameEn}
                />
                <div
                  className={`${styles.addToCart} pointer align-items-center justify-content-center w-100 py-2 position-absolute bottom-0`}
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingProductId === product.id || product.quantityInStock === 0}
                  style={{
                    cursor:
                      addingProductId === product.id || product.quantityInStock === 0
                        ? "not-allowed"
                        : "pointer",
                    opacity: addingProductId === product.id || product.quantityInStock === 0 ? 0.7 : 1,
                  }}
                >
                  {addingProductId === product.id || product.quantityInStock === 0 ? (
                    <span>
                      <i className="fas fa-spinner fa-spin me-2"></i>
                      {t("addingToCart")}
                    </span>
                  ) : (
                    t("AddCart")
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between position-absolute top-0 start-0 p-3 w-100">
                {product.discountPrice > 0 && (
                  <div
                    className={`${styles.enhancedDiscountBadge} d-flex align-items-center justify-content-center`}
                  >
                    <span className="discount-text">
                      {product.discountPrice_type === "percent"
                        ? `${product.discountPrice}% OFF`
                        : `-$${product.discountPrice}`}
                    </span>
                  </div>
                )}
                <div></div>
                <div className="d-flex align-items-center gap-2 flex-column">
                  <HeartIcon
                    productId={product.id}
                    className={`${styles.enhancedActionButton} text-white`}
                    onToggle={handleWishlistToggle}
                    isLiked={isInWishlist(product.id)}
                  />
                  <Link
                    href={`/product/${product.id}`}
                    className={`${styles.enhancedActionButton} d-flex align-items-center justify-content-center`}
                  >
                    <SlEye className="text-white" />
                  </Link>
                </div>
              </div>
              <div className={`${styles.cardTitle} position-relative pt-2 z-3`}>
                {locale === "en" ? product.nameEn : product.nameAr}
              </div>
              <div className="d-flex justify-content-between align-items-center pt-1">
                <div
                  className={`${styles.cardPrice} z-3 d-flex align-items-center`}
                >
                  {product.discountPrice > 0 ? (
                    <>
                      <div className={styles.cardPrice}>
                        $
                        {product.discountPrice_type === "percent"
                          ? (
                              product.price -
                              (product.discountPrice / 100) * product.price
                            ).toFixed(2)
                          : (product.price - product.discountPrice).toFixed(2)}
                      </div>
                      <div className="mx-2 text-decoration-line-through text-body-secondary">
                        ${product.price}
                      </div>
                    </>
                  ) : (
                    `$${product.price}`
                  )}
                </div>
              </div>
              <div>
                <Stars rating={product.ratingAverage} />
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-black w-100 fw-bold">
            {t("noProducts")}
          </h1>
        )}
      </div>
    </main>
  );
}

export default ProductProduct;
