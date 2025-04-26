'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import '../../../../styles/pagesStyle/product/secondSectionP.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function SecondSectionP({ product }) {
  const t = useTranslations("productDetails");
  const swiperef = useRef(null);
  const [counter, setCounter] = useState(product?.minimum_order_qty || 1);
  const [selectedImage, setSelectedImage] = useState(product?.thumbnail_full_url?.path || '');

  useEffect(() => {
    if (product) {
      setCounter(product.minimum_order_qty);
      setSelectedImage(product.thumbnail_full_url?.path || '');
    }
  }, [product]);

  const handleIncrease = () => {
    setCounter((prev) => (prev < product.current_stock ? prev + 1 : prev));
  };

  const handleDecrease = () => {
    setCounter((prev) => (prev > product.minimum_order_qty ? prev - 1 : prev));
  };

  const handleMouseEnter = () => swiperef.current?.swiper?.autoplay?.stop();
  const handleMouseLeave = () => swiperef.current?.swiper?.autoplay?.start();

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  if (!product) {
    return <h1 className='text-center fw-bold w-100'>{t("loading")}</h1>;
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
              ref={swiperef}
              direction="vertical"
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={1000}
              modules={[Autoplay]}
              className="vertical-swiper"
            >
              {product.images_full_url?.map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="pointer"
                    onClick={() => handleImageClick(img.path)}
                  >
                    <img
                      className="imgSliderP"
                      src={img.path}
                      alt={product.name}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="col-9 d-flex align-items-sm-center justify-content-center">
              <img
                className="main-product-image w-100"
                src={selectedImage}
                alt={product.name}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-5 pt-3 pt-sm-0 d-flex justify-content-center flex-column">
          <div className="product-title fw-semibold text-capitalize">{product.name}</div>
          <div className="d-flex align-items-center gap-4 pt-2 pb-md-4 pb-3">
            <div className="star">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </div>
            <div className="CustomerReview">
              ({product.reviews_count} {t("customerReviews")})
            </div>
          </div>
          <div className="product-price fw-semibold d-flex align-items-center gap-4">
            {product.discount > 0 ? (
              <>
                <div>${product.unit_price}</div>
                <div className="ms-2">
                  $ 
                  {product.discount_type === "percent"
                    ? product.unit_price - (product.discount / 100) * product.unit_price
                    : product.unit_price - product.discount}
                </div>
              </>
            ) : (
              `$${product.unit_price}`
            )}
          </div>
          <div className="product-description pt-md-4 pb-md-4 pt-3">
            {product.meta_description}
          </div>
          <div className="d-flex gap-4 align-items-center pt-md-4 pt-3">
            <div className="product-count px-1 py-2 fw-bold d-flex align-items-center gap-3">
              <div
                className="pointer"
                onClick={handleDecrease}
                aria-label={t("decreaseQuantity")}
              >
                <IoIosArrowBack />
              </div>
              {counter}
              <div
                className="pointer"
                onClick={handleIncrease}
                aria-label={t("increaseQuantity")}
              >
                <IoIosArrowForward />
              </div>
            </div>
            <button className="add-to-cart text-white fw-bold px-4 py-2 rounded-5">
              {t("addToCart")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SecondSectionP;
