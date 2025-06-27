"use client";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import "../../../../styles/pagesStyle/product/secondSectionP.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import StarRating from "../shared/StarRating";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useAddToCart } from "../../../../context/authContext";

const SecondSectionP = React.memo(function SecondSectionP({ productData }) {
  const t = useTranslations("productDetails");
  const swiperRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [isRefetching, setIsRefetching] = useState(false);
  const { addToCart, isAddingToCart, addToCartError, clearAddToCartError } = useAddToCart();
  const [addingToCart, setAddingToCart] = useState(false);
  const locale = useLocale();
  const isArabic = locale === "ar";
  const product = useMemo(() => productData?.data || {}, [productData]);
  const name = isArabic ? product.nameAr : product.nameEn;
  const about = isArabic ? product.aboutAr : product.aboutEn;
  const material = isArabic ? product.materialAr : product.materialEn;
  const category = isArabic ? product.categoryNameAr : product.categoryNameEn;

  useEffect(() => {
    if (product?.mainImageUrl) {
      setSelectedImage(product.mainImageUrl);
      setIsLoading(false);
    }
    if (product?.reviews) {
      setReviews(product.reviews);
    }
  }, [product]);

  const handleMouseEnter = () => swiperRef.current?.swiper?.autoplay?.stop();
  const handleMouseLeave = () => swiperRef.current?.swiper?.autoplay?.start();
  const handleImageClick = (imageUrl) => setSelectedImage(imageUrl);
  const handleImageError = (e) => {
    e.target.src = "/images/imagePlaceHolder.jpg";
  };

  const handleAddToCart = async () => {
    if (!product.id) return;
    
    setAddingToCart(true);
    clearAddToCartError();
    
    const result = await addToCart(product.id, 1);
    
    setAddingToCart(false);
  };

  const ratingAverage = useMemo(() => {
    return reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
  }, [reviews]);

  const refetchProductData = async () => {
    if (!product.id) return;
    
    setIsRefetching(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Products/${product.id}`, {
        cache: "no-store",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data?.data?.reviews) {
          setReviews(data.data.reviews);
        }
      }
    } catch (error) {
    } finally {
      setIsRefetching(false);
    }
  };

  const handleNewReview = async (newReview) => {
    // Option 1: Add to local state immediately for instant feedback
    setReviews(prev => [...prev, newReview]);
    
    // Option 2: Refetch from server to get the complete updated data
    await refetchProductData();
  };

  const hasDiscount = product.discountPrice > 0;

  if (isLoading) {
    return (
      <div className="order-loading">
        {" "}
        <div className="loading-overlay fade-in">
          <div className="d-flex align-items-center justify-content-center">
            <div className="text-center ringPosition position-relative d-flex align-items-center gap-5 flex-column">
              <div>
                <div className="loading-ring "></div>
                <img
                  src="/images/logo.jpg"
                  alt="Loading..."
                  width={150}
                  height={150}
                  className="loading-img"
                />
              </div>
              <div className="loadingText ps-3">{t("loading")}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product?.nameEn) {
    return (
      <h1 className="text-center fw-bold w-100 py-5 my-5">
        {t("productNotFound")}
      </h1>
    );
  }

  return (
    <main className="container my-5 py-md-5">
      <section className="row over">
        <div className="col-sm-7">
          <div
            className="d-flex gap-lg-3 gap-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Swiper
              key={product.id}
              ref={swiperRef}
              direction="vertical"
              slidesPerView={3}
              spaceBetween={30}
              loop
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              speed={1000}
              modules={[Autoplay]}
              className="vertical-swiper"
            >
              {[product.mainImageUrl, ...(product.productImage || [])]
                .filter(Boolean)
                .map((img, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="pointer"
                      onClick={() => handleImageClick(img)}
                    >
                      <img
                        className="imgSliderP"
                        src={img}
                        alt={name}
                        onError={handleImageError}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className="col-9 d-flex align-items-sm-center justify-content-center">
              <img
                className="main-product-image w-100"
                src={selectedImage}
                alt={name}
                onError={handleImageError}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-5 pt-3 pt-sm-0 d-flex justify-content-center flex-column">
          <div className="product-title fw-semibold text-capitalize">
            {name}
          </div>
          <div className="product-category mb-2">
            <b>{t("category")}:</b> {category}
          </div>
          <div className="product-material mb-2">
            <b>{t("material")}:</b> {material}
          </div>
          <div className="product-price fw-semibold d-flex align-items-center gap-4 mb-2">
            {hasDiscount ? (
              <>
                <div className="text-success">
                  ${(product.price - product.discountPrice).toFixed(2)}
                </div>
                <div className="text-decoration-line-through text-muted">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-danger">
                 - ${product.discountPrice.toFixed(2)}
                </div>
              </>
            ) : (
              `$${product.price.toFixed(2)}`
            )}
          </div>
          <div className="product-description pt-md-2 pb-md-2 pt-2">
            {about}
          </div>
          <div className="product-stock mb-2">
            <b>{t("stock")}:</b> {product.quantityInStock}
          </div>
          {product.isPreOrder && (
            <div className="badge bg-warning text-dark mb-2">{t("preOrder")}</div>
          )}
          {product.quantityInStock === 0 && (
            <div className="text-danger mb-2">{t("outOfStock")}</div>
          )}
          <div>
            <button
              className="add-to-cart text-white fw-bold px-4 py-2 rounded-5"
              onClick={handleAddToCart}
              disabled={addingToCart || product.quantityInStock === 0}
              style={{
                cursor: addingToCart || product.quantityInStock === 0 ? 'not-allowed' : 'pointer',
                opacity: addingToCart || product.quantityInStock === 0 ? 0.7 : 1
              }}
            >
              {addingToCart ? (
                <span>
                  <i className="fas fa-spinner fa-spin me-2"></i>
                  {t("adding")}
                </span>
              ) : (
                t("addToCart")
              )}
            </button>
          </div>
        </div>
      </section>
      <div className="mt-4 mt-md-5">
        <StarRating
          initialRating={0}
          productId={product.id}
          reviews={reviews}
          onNewReview={handleNewReview}
        />
        {isRefetching && (
          <div className="text-center mt-3">
            <small className="text-muted">{t("refreshingReviews") || "Refreshing reviews..."}</small>
          </div>
        )}
      </div>
    </main>
  );
});

export default SecondSectionP;