"use client";

import { useRef, useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../../../../../styles/pagesStyle/home/flashSales.module.css";
import { SlEye } from "react-icons/sl";
import { Link } from "@/i18n/routing";
import Stars from "../../shared/stars";
import HeartIcon from "../../shared/HeartIcon";
import { useAddToCart } from "../../../../../context/authContext";
import { useAuth } from "../../../../../context/authContext";
import { useTranslations } from "next-intl";

export default function FlashSales({ locale}) {
  const swiperRef = useRef(null);
  const { addToCart, isAddingToCart, addToCartError, clearAddToCartError } =
    useAddToCart();
  const { toggleWishlist, isInWishlist } = useAuth();
  const [addingProductId, setAddingProductId] = useState(null);
  const [localProducts, setLocalProducts] = useState([]);
  const [flashData, setFlashData] = useState([]);
  const t = useTranslations("homePage.flashSales");

  useEffect(() => {
    getFlashData().then((data) => {
      setFlashData(data);
    });
  }, []);

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

  const getFlashData = async () => {  
    let headers = {};
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Products/flashsale?flashsaleNumber=100`,
      {
        cache: "no-store",
        headers,
      }
    );
    if (!res.ok) throw new Error(`API Error`);
    const result = await res.json();
    return result?.data || [];
  }

  const handleWishlistToggle = async (productId) => {
    try {
      const result = await toggleWishlist(productId);
      if (result && result.success) {
        setLocalProducts((prev) =>
          prev.map((product) =>
            product.id === productId
              ? { ...product, isLiked: !product.isLiked }
              : product
          )
        );
      }
    } catch (error) {
    }
  };

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

    const groupedProducts = chunkArray(flashData, 4);
  return (
    <main className="py-lg-5 mb-lg-5 py-4 my-4">
      <section>
        <div className="d-flex align-items-center gap-3 pb-3">
          <div className="redBox"></div>
          <div className="redText">{t("title")}</div>
        </div>

        <div className="d-flex align-items-center justify-content-between pb-lg-5 pb-4">
          <div className="d-flex gap-5">
            <div className={`${styles.flashText} fw-semibold pt-2`}>
              {t("subtitle")}
            </div>
          </div>
          <div dir="ltr" className="d-flex align-items-center gap-2">
            <div
              className={`${styles.flashArrow} p-3 rounded-circle d-flex justify-content-center align-items-center`}
              onClick={handlePrev}
            >
              <FaArrowLeftLong />
            </div>
            <div
              className={`${styles.flashArrow} p-3 rounded-circle d-flex justify-content-center align-items-center`}
              onClick={handleNext}
            >
              <FaArrowRightLong />
            </div>
          </div>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
        >
          {groupedProducts.map((group, groupIndex) => (
            <SwiperSlide key={groupIndex}>
              <div>
                <div className="row">
                  {group.map((product, index) => (
                    <div
                      key={product.id || index}
                      className={`col-6 col-md-3 mb-4 ${
                        index >= 4 ? "mt-2" : ""
                      }`}
                    >
                      <div
                        className={`${styles.productCard} position-relative rounded overflow-hidden`}
                      >
                        <div
                          className={`${styles.cartImageCont} rounded position-relative`}
                        >
                          <img
                            src={product?.mainImageUrl || ""}
                            className={`${styles.cardImg} rounded overflow-hidden mb-2`}
                            alt={product?.nameEn || ""}
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
                              t("addToCart")
                            )}
                          </div>
                        </div>

                        <div dir="ltr" className="d-flex justify-content-between position-absolute top-0 start-0 p-2 w-100">
                          {product.discountPrice > 0 && (
                            <div
                              className={`${styles.discountPrice} px-3 py-1 rounded`}
                            >
                              -{product.discountPrice}$
                            </div>
                          )}
                          <div></div>
                          <div className="d-flex align-items-center gap-2 flex-column ">
                            <HeartIcon
                              productId={product.id}
                              className={styles.likes}
                              onToggle={() => handleWishlistToggle(product.id)}
                              isLiked={product.isLiked}
                            />
                            <Link
                              href={`/product/${product.id}`}
                              className={`${styles.likes} d-flex align-items-center justify-content-center text-white`}
                            >
                              <SlEye />
                            </Link>
                          </div>
                        </div>

                        <div
                          className={`${styles.cardTitle} position-relative pt-2 z-3`}
                        >
                          {locale === "en" ? product?.nameEn : product?.nameAr}
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
                                        product?.price -
                                        (product?.discountPrice / 100) *
                                          product?.price
                                      ).toFixed(2)
                                    : (
                                        product.price - product?.discountPrice
                                      ).toFixed(2)}
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
                          <Stars rating={product?.ratingAverage || 0} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}
