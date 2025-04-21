"use client";

import { useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../../../../../styles/pagesStyle/home/flashSales.module.css";
import { CiHeart } from "react-icons/ci";
import { SlEye } from "react-icons/sl";
import {Link} from "@/i18n/routing";
import Stars from "../../stars";
const rating = 4.5;
export default function FlashSales() {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };
  const relatedProducts = [
    {
      id: 1,
      name: "Product 1",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 100,
      discount: 20,
      discount_type: "percent",
      unit: "kg",
      soldOut: false,
    },
    {
      id: 2,
      name: "Product 2",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 80,
      discount: 10,
      discount_type: "flat",
      unit: "kg",
      soldOut: true,
    },
    {
      id: 3,
      name: "Product 3",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 50,
      discount: 0,
      unit: "kg",
      soldOut: false,
    },
    {
      id: 4,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      soldOut: false,
    },
    {
      id: 5,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      soldOut: false,
    },
    {
      id: 6,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      soldOut: false,
    },
    {
      id: 7,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      soldOut: false,
    },
  ];
  return (
    <main className=" py-lg-5 my-lg-5 py-4 my-4">
      <section>
        <div className="d-flex align-items-center gap-3 pb-3">
          <div className="redBox"></div>
          <div className="redText">Today’s</div>
        </div>
        <div className="d-flex align-items-center justify-content-between pb-lg-5 pb-4">
            <div className={`${styles.flashText} fw-semibold pe-5 pt-2 `}>
              Flash Sales
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
          slidesPerView={4}
          loop={true}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
          navigation={{
            prevEl: `.${styles.prevArrow}`,
            nextEl: `.${styles.nextArrow}`,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {relatedProducts.map((product, index) => (
            <SwiperSlide key={product.id || index}>
              <div
                className={`${styles.productCard} position-relative rounded overflow-hidden mb-3`}
              >
                <div
                  className={`${styles.cartImageCont} rounded position-relative`}
                >
                  <img
                    src={product.thumbnail_full_url.path}
                    className={`${styles.cardImg} rounded overflow-hidden mb-2`}
                    alt={product.name}
                  />
                  <div
                    className={`${styles.addToCart} pointer align-items-center justify-content-center w-100 py-2 position-absolute bottom-0`}
                  >
                    Add To Cart
                  </div>
                </div>
                <div className="d-flex justify-content-between position-absolute top-0 start-0 p-2 w-100">
                  {product.discount > 0 && (
                    <div
                      className={`${styles.discountPrice} px-3 py-1 rounded`}
                    >
                      -{product.discount}
                      {product.discount_type === "percent" ? "%" : "$"}
                    </div>
                  )}

                  <div className="d-flex align-items-center gap-2 flex-column ms-auto">
                    <div
                      className={`${styles.likes} p-1 fs-5 d-flex bg-white rounded-circle pointer`}
                    >
                      <CiHeart />
                    </div>
                    <div
                      className={`${styles.likes} p-1 fs-5 d-flex bg-white rounded-circle pointer`}
                    >
                      <SlEye />
                    </div>
                  </div>
                </div>
                <div className={`${styles.cardTitle} position-relative pt-2 z-3`}>
                  {product.name}
                </div>
                <div className="d-flex justify-content-between align-items-center pt-1">
                  <div
                    className={`${styles.cardPrice} z-3 d-flex align-items-center`}
                  >
                    {product.discount > 0 ? (
                      <>
                        <div className={styles.cardPrice}>
                          ${product.unit_price}
                        </div>
                        <div className="ms-2 text-decoration-line-through text-body-secondary">
                          $
                          {product.discount_type === "percent"
                            ? (
                                product.unit_price -
                                (product.discount / 100) * product.unit_price
                              ).toFixed(2)
                            : (product.unit_price - product.discount).toFixed(
                                2
                              )}
                        </div>
                      </>
                    ) : (
                      `$${product.unit_price}`
                    )}
                  </div>
                </div>
                <div>
                  <Stars rating={rating} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="pt-2 d-flex justify-content-center">
          <Link
            href="/"
            className={`${styles.viewProducts} px-5 py-3 mt-5 rounded`}
          >
            View All Products
          </Link>
        </div>
      </section>
    </main>
  );
}
