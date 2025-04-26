"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../../../../../styles/pagesStyle/home/homeFirstSlider.module.css"; 


const HomeSlider = ({homeSectionOneData}) => {
  const swiperRef = useRef(null);

  return (
    <main
      className={`${styles.sliderContainer} mt-5`} // Using CSS module
      onMouseEnter={() => swiperRef.current?.autoplay.stop()}
      onMouseLeave={() => swiperRef.current?.autoplay.start()}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className={styles.slider} // Using CSS module
      >
        {homeSectionOneData.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <img
              className={`${styles.slideImg} w-100`}
              src={slide.imageUrl || "/images/slider.jpg"}
              alt="slide"
              height={344}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default HomeSlider;
