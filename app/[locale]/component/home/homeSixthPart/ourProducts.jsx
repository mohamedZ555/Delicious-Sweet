"use client";

import { useRef } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../../../../../styles/pagesStyle/home/homeOurProducts.module.css";
import { CiHeart } from "react-icons/ci";
import { SlEye } from "react-icons/sl";
import { Link } from "@/i18n/routing";
import Stars from "../../shared/stars";

export default function OurProducts({ allProducts = [] }) {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groupedProducts = chunkArray(allProducts, 8);
  return (
    <main className="py-lg-5 my-lg-5 py-4 my-4">
      <section>
        <div className="d-flex align-items-center gap-3 pb-3">
          <div className="redBox"></div>
          <div className="redText">Our Products</div>
        </div>

        <div className="d-flex align-items-center justify-content-between pb-lg-5 pb-4">
          <div className="d-flex gap-5">
            <div className={`${styles.flashText} fw-semibold pe-5 pt-2`}>
              Explore Our Products
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div
              className={`${styles.flashArrow} p-lg-3 rounded-circle p-1 d-flex justify-content-center align-items-center`}
              onClick={handlePrev}
            >
              <FaArrowLeftLong />
            </div>
            <div
              className={`${styles.flashArrow} p-lg-3 rounded-circle p-1 d-flex justify-content-center align-items-center`}
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
                          >
                            Add To Cart
                          </div>
                        </div>

                        <div className="d-flex justify-content-between position-absolute top-0 start-0 p-2 w-100">
                          {product.new > 0 && (
                            <div
                              className={`${styles.newProduct} px-3 py-1 rounded`}
                            >
                              NEW
                            </div>
                          )}
                          <div className="d-flex align-items-center gap-2 flex-column ms-auto">
                            <div
                              className={`${styles.likes} p-1 fs-5 d-flex text-black bg-white rounded-circle pointer`}
                            >
                              <CiHeart />
                            </div>
                            <Link href={`/product/${product.id}`}
                              className={`${styles.likes} p-1 fs-5 d-flex text-black bg-white rounded-circle pointer`}
                            >
                              <SlEye />
                            </Link>
                          </div>
                        </div>

                        <div
                          className={`${styles.cardTitle} position-relative pt-2 z-3`}
                        >
                          {product?.nameEn || ""}
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-1">
                          <div
                            className={`${styles.cardPrice} z-3 d-flex align-items-center`}
                          >
                            {product.discountPrice > 0 ? (
                              <>
                                <div className={styles.cardPrice}>
                                  ${product.price}
                                </div>
                                <div className="ms-2 text-decoration-line-through text-body-secondary">
                                  $
                                  {product.discount_type
                                    ? (
                                        product?.price -
                                        (product?.discountPrice / 100) *
                                          product?.price
                                      ).toFixed(2)
                                    : (
                                        product.price - product?.discountPrice
                                      ).toFixed(2)}
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

        <div className="pt-2 d-flex justify-content-center">
          <Link
            href="/product"
            className={`${styles.viewProducts} px-5 py-3 mt-5 rounded`}
          >
            View All Products
          </Link>
        </div>
      </section>
    </main>
  );
}
