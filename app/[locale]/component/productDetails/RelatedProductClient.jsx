"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "@/i18n/routing";
import { SlEye } from "react-icons/sl";
import HeartIcon from "../shared/HeartIcon";
import { useAddToCart } from "../../../../context/authContext";
import { useAuth } from "../../../../context/authContext";
import "../../../../styles/pagesStyle/product/relatedProduct.css";

export default function RelatedProductClient({ relatedProducts }) {
  const t = useTranslations("productDetails");
  const swiperRef = useRef(null);
  const { addToCart, isAddingToCart, addToCartError, clearAddToCartError } = useAddToCart();
  const { toggleWishlist, isInWishlist } = useAuth();
  const [addingProductId, setAddingProductId] = useState(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const handleAddToCart = async (productId) => {
    setAddingProductId(productId);
    clearAddToCartError();
    
    const result = await addToCart(productId, 1);
    
    setAddingProductId(null);
  };

  const handleWishlistToggle = async (productId) => {
    try {
      await toggleWishlist(productId);
    } catch (error) {
    }
  };

  return (
    <main className="container py-lg-5 my-lg-5 py-4 my-4">
      <section>
        <div className="d-flex align-items-center justify-content-between pb-lg-5 pb-4">
          <div className="relatedText fw-semibold">{t("relatedProducts")}</div>
          <div className="d-flex align-items-center gap-3">
            <div
              className="relatedArrow prevArrow p-lg-3 p-2 fw-bold d-flex justify-content-center align-items-center"
              onClick={handlePrev}
            >
              <IoIosArrowBack />
            </div>
            <div
              className="relatedArrow nextArrow p-lg-3 p-2 fw-bold d-flex justify-content-center align-items-center"
              onClick={handleNext}
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          navigation={{
            prevEl: ".prevArrow",
            nextEl: ".nextArrow",
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {relatedProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="p-3 productCarrd position-relative mb-3">
                <div className="position-relative">
                  <img src={product.thumbnail_full_url.path} className="card-img mb-2" alt={product.name} />
                  
                  {/* Action Buttons */}
                  <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-2">
                    <div className="bg-dark bg-opacity-75 rounded-circle p-2 d-flex align-items-center justify-content-center">
                      <HeartIcon
                        productId={product.id}
                        className="text-white"
                        onToggle={() => handleWishlistToggle(product.id)}
                        isLiked={product.isLiked}
                      />
                    </div>
                    <Link 
                      href={`/product/${product.id}`}
                      className="bg-dark bg-opacity-75 rounded-circle p-2 d-flex align-items-center justify-content-center"
                    >
                      <SlEye className="text-white" />
                    </Link>
                  </div>

                  {product.soldOut && (
                    <div className="soldOut position-absolute px-2 rounded-5 text-white">
                      {t("soldOut")}
                    </div>
                  )}
                </div>
                
                <div className="cardTitle fw-semibold position-relative z-3">
                  {product.name}
                </div>
                <div className="d-flex justify-content-between align-items-center pt-1">
                <div className="cardPrice fw-bold z-3 d-flex align-items-center">
                    {product.discount > 0 ? (
                      <>
                        <div>
                          ${product.unit_price}
                          {product.unit ? product.unit : ""}
                        </div>
                        <div className="ms-1">
                          $ 
                          {product.discount_type === "percent"
                            ? product.unit_price -
                              (product.discount / 100) * product.unit_price
                            : product.unit_price - product.discount}
                          {product.unit ? product.unit : ""}
                        </div>
                      </>
                    ) : (
                      `${product.unit_price}${product.unit ? product.unit : ""}`
                    )}
                  </div>
                  <div 
                    className="addToCardBtn rounded-5 fw-bold text-white px-3 py-2 z-3 pointer"
                    onClick={() => handleAddToCart(product.id)}
                    style={{
                      cursor: addingProductId === product.id ? 'not-allowed' : 'pointer',
                      opacity: addingProductId === product.id ? 0.7 : 1
                    }}
                  >
                    {addingProductId === product.id ? (
                      <span>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Adding...
                      </span>
                    ) : (
                      t("addToCart")
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}
