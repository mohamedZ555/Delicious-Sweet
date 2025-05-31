"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { CiHeart } from "react-icons/ci";
import { SlEye } from "react-icons/sl";
import Stars from "../shared/stars";

import styles from "../../../../styles/pagesStyle/home/flashSales.module.css";
function ProductProduct({ products = [] }) {
  const t = useTranslations("Product");

  return (
    <main>
      <div className="row">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              className={`${styles.productCard} col-lg-4 col-md-6 col-12 position-relative rounded overflow-hidden mb-3`}
              key={index}
            >
              <div
                className={`${styles.cartImageCont} rounded position-relative`}
              >
                <img
                  src={product.mainImageUrl}
                  className={`${styles.cardImg} rounded overflow-hidden mb-2`}
                  alt={product.nameEn}
                />
                <div
                  className={`${styles.addToCart} pointer align-items-center justify-content-center w-100 py-2 position-absolute bottom-0`}
                >
                  {t("AddCart")}
                  
                </div>
              </div>
              <div className="d-flex justify-content-between position-absolute top-0 start-0 p-2 w-100">
                {product.discountPrice > 0 && (
                  <div className={`${styles.discountPrice} px-3 py-1 rounded`}>
                    -{product.discountPrice}$
                  </div>
                )}

                <div className="d-flex align-items-center gap-2 flex-column ms-auto me-3">
                  <div
                    className={`${styles.likes} p-1 fs-5 d-flex bg-white rounded-circle pointer`}
                  >
                    <CiHeart />
                  </div>
                  <Link href={`/product/${product.id}`}
                    className={`${styles.likes} p-1 fs-5 d-flex bg-white text-black rounded-circle pointer`}
                  >
                    <SlEye />
                  </Link>
                </div>
              </div>
              <div className={`${styles.cardTitle} position-relative pt-2 z-3`}>
                {product.nameEn}
              </div>
              <div className="d-flex justify-content-between align-items-center pt-1">
                <div
                  className={`${styles.cardPrice} z-3 d-flex align-items-center`}
                >
                  {product.discountPrice > 0 ? (
                    <>
                      <div className={styles.cardPrice}>${product.price}</div>
                      <div className="ms-2 text-decoration-line-through text-body-secondary">
                        $
                        {product.discountPrice_type === "percent"
                          ? (
                              product.price -
                              (product.discountPrice / 100) * product.price
                            ).toFixed(2)
                          : (product.price - product.discountPrice).toFixed(2)}
                      </div>
                    </>
                  ) : (
                    `$${product.price}`
                  )}
                </div>
              </div>
              <div>
                <Stars rating={product.ratingAverage} />
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-black w-100 fw-bold">
            {t("noProducts")}
          </h1>
        )}
      </div>
    </main>
  );
}

export default ProductProduct;
