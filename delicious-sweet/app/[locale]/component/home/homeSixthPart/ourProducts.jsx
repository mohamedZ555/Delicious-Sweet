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
import {Link} from "@/i18n/routing";
import Stars from "../../stars";

const rating = 4.5;

export default function OurProducts() {
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
      new: true,
    },
    {
      id: 2,
      name: "Product 2",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 80,
      discount: 10,
      discount_type: "flat",
      unit: "kg",
      new: true,
    },
    {
      id: 3,
      name: "Product 3",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 50,
      discount: 0,
      unit: "kg",
      new: true,
    },
    {
      id: 4,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 5,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 6,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 7,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 8,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 9,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 10,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 11,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 12,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 13,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 14,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 15,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 16,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 17,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
    {
      id: 18,
      name: "Product 4",
      thumbnail_full_url: { path: "/images/slider.jpg" },
      unit_price: 120,
      discount: 30,
      discount_type: "percent",
      new: true,
    },
  ];
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groupedProducts = chunkArray(relatedProducts, 8);

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
                          {product.new > 0 && (
                            <div
                              className={`${styles.newProduct} px-3 py-1 rounded`}
                            >
                              NEW
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

                        <div
                          className={`${styles.cardTitle} position-relative pt-2 z-3`}
                        >
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
                                        (product.discount / 100) *
                                          product.unit_price
                                      ).toFixed(2)
                                    : (
                                        product.unit_price - product.discount
                                      ).toFixed(2)}
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
                    </div>
                  ))}
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
