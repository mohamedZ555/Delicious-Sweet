"use client";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
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

const SecondSectionP = React.memo(function SecondSectionP({ productData }) {
  const t = useTranslations("productDetails");
  const swiperRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const product = useMemo(() => productData?.data || {}, [productData]);

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

  const ratingAverage = useMemo(() => {
    return reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
  }, [reviews]);

  const handleNewReview = (newReview) => {
    setReviews(prev => [...prev, newReview]);
  };

  const hasDiscount = product.discountPrice > 0;

  if (isLoading) {
    return (
      <h1 className="text-center fw-bold w-100 py-5 my-5">{t("loading")}</h1>
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
                        alt={product.nameEn}
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
                alt={product.nameEn}
                onError={handleImageError}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-5 pt-3 pt-sm-0 d-flex justify-content-center flex-column">
          <div className="product-title fw-semibold text-capitalize">
            {product.nameEn}
          </div>

          <div className="d-flex align-items-center gap-4 pt-2 pb-md-4 pb-3">
            <div className="star">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < Math.round(ratingAverage) ? "#ffc107" : "#e4e5e9"}
                />
              ))}
            </div>
            <div className="CustomerReview">
              ({reviews.length} {t("customerReviews")})
            </div>
          </div>

          <div className="product-price fw-semibold d-flex align-items-center gap-4">
            {hasDiscount ? (
              <>
                <div className="text-decoration-line-through text-muted">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-danger">
                  ${product.discountPrice.toFixed(2)}
                </div>
              </>
            ) : (
              `$${product.price.toFixed(2)}`
            )}
          </div>

          <div className="product-description pt-md-4 pb-md-4 pt-3">
            {product.aboutEn}
          </div>

          <div>
            <button className="add-to-cart text-white fw-bold px-4 py-2 rounded-5">
              {t("addToCart")}
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
      </div>
    </main>
  );
});

export default SecondSectionP;