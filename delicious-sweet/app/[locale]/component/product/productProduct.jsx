"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaHeart, FaEye } from "react-icons/fa";
import {Link} from "@/i18n/routing";

function ProductProduct({ products = [], searchTerm, selectedCategory, currentPage, setCurrentPage, setTotalPages }) {
  const t = useTranslations("product");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const ITEMS_PER_PAGE = 9;
  

  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      setFilteredProducts([]);
      setTotalPages(0);
      return;
    }

    const filtered = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const productCategoryID = product.category_ids?.[0]?.id?.toString() || "";

      const matchesCategory = selectedCategory ? productCategoryID === selectedCategory.toString() : true;
      const matchesSearch = searchTerm ? name.includes(searchTerm.toLowerCase()) : true;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [products, searchTerm, selectedCategory, setCurrentPage, setTotalPages]);

  useEffect(() => {
    if (!filteredProducts.length) {
      setPaginatedProducts([]);
      return;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    setPaginatedProducts(filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE));
  }, [filteredProducts, currentPage]);

  return (
    <main>
      <div className="row">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((card, index) => (
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4" key={index}>
              <div className="p-3 cardCont position-relative mb-3">
                <img src={card.mainImageUrl || "/fallback-image.jpg"} className="card-img mb-2" alt={card.nameEn} />
                <div className="cardHover position-absolute w-100 h-100 top-0 start-0">
                  <Link href={`/Product/${card.id}`}>
                    <div className="secIcon bg-white position-absolute rounded-circle d-flex align-items-center justify-content-center">
                      <FaEye />
                    </div>
                  </Link>
                  <div className="firIcon bg-white position-absolute rounded-circle d-flex align-items-center justify-content-center">
                    <FaHeart />
                  </div>
                </div>
                <div className="cardTitle fw-semibold position-relative z-3 text-capitalize">{card.nameEn || ""}</div>
                <div className="d-flex justify-content-between align-items-center pt-1">
                  <div className="cardPrice fw-bold z-3 d-flex align-items-center">
                    {/* {card.discount > 0 ? (
                      <>
                        <div>${card.price}{card.unit || ""}</div>
                        <div className="ms-1">
                          ${card.discount_type === "percent" ? card.unit_price - (card.discount / 100) * card.unit_price : card.unit_price - card.discount}
                          {card.unit || ""}
                        </div>
                      </>
                    ) : (
                      `${card.unit_price}${card.unit || ""}`
                    )} */}
                  </div>
                  <div className="addToCardBtn rounded-5 fw-bold text-white px-3 py-2 z-3">
                    {t("addToCart")}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center w-100 fw-bold">{t("noProducts")}</h1>
        )}
      </div>
    </main>
  );
}

export default ProductProduct;
