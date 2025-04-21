"use client";

import { useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../../../../../styles/pagesStyle/home/flashSales.module.css";
import { GiWrappedSweet } from "react-icons/gi";

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
      sweets: "chocolate",
    },
    {
      sweets: "sweet",
    },
    {
      sweets: "cake",
    },
    {
      sweets: "candy",
    },
    {
      sweets: "chocolate",
    },
    {
      sweets: "sweet",
    },
    {
      sweets: "cake",
    },
    {
      sweets: "candy",
    },
    {
      sweets: "chocolate",
    },
    {
      sweets: "sweet",
    },
    {
      sweets: "cake",
    },
    {
      sweets: "candy",
    },
  ];
  return (
    <main className=" py-lg-5 my-lg-5 py-4 my-4">
      <section>
        <div className="d-flex align-items-center gap-3 pb-3">
          <div className="redBox"></div>
          <div className="redText">Categories</div>
        </div>
        <div className="d-flex align-items-center justify-content-between pb-lg-5 pb-4">
          <div className="d-flex gap-5">
            <div className={`${styles.flashText} fw-semibold pe-5 pt-2 `}>
              Browse By Category
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
          slidesPerView={6}
          loop={true}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
          navigation={{
            prevEl: `.${styles.prevArrow}`,
            nextEl: `.${styles.nextArrow}`,
          }}
          breakpoints={{
            320: { slidesPerView: 3 },
            576: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            992: { slidesPerView: 6 },
          }}
        >
          {relatedProducts.map((product, index) => (
            <SwiperSlide key={product.id || index}>
              <div
                className={`${styles.category} pointer rounded d-flex flex-column align-items-center justify-content-center gap-2`}
              >
                <div className={`${styles.categoryIcons} fs-1`}>
                  <GiWrappedSweet />
                </div>
                <div className={styles.cardTitle}>{product.sweets}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
}
