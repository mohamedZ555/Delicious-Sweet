"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import DisplayPagination from "./DisplayPagination";
import ProductProduct from "./productProduct";
import "../../../../styles/pagesStyle/loading.css";
import { useTranslations } from "next-intl";

function ProductContainer({
  locale,
  catog,
  currentCategory,
  currentSearch,
  currentPage,
}) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Product");
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/Products/GetAllProductsForUser?pageNumber=${currentPage}&pageSize=9`;
        if (currentCategory) url += `&CategoryId=${currentCategory}`;
        if (currentSearch) url += `&searchTerm=${currentSearch}`;

        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const res = await fetch(url, {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const result = await res.json();
        setProducts(result?.data || []);
        setPagination({
          current_page: result?.pageNumber || 1,
          last_page: Math.ceil(result?.totalCount / result?.pageSize) || 1,
          per_page: result?.pageSize || 10,
          total: result?.totalCount || 0,
        });
      } catch (error) {
        setProducts([]);
        setPagination({
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: 0,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [currentPage, currentCategory, currentSearch]);

  const handleCategoryFilter = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    params.delete("search");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.delete("category");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <main className="container py-sm-5 pt-5 pb-3 my-sm-5">
      <section className="row">
        <SideBar
          onSearch={handleSearch}
          setSelectedCategory={handleCategoryFilter}
          selectedCategory={currentCategory}
          locale={locale}
          catog={catog}
        />
        <div className="col-12 col-sm-6 col-md-7 col-xl-9 col-lg-8">
          <div className="mt-4 mt-sm-0">
            {loading ? (
              <div className="order-loading">
                {" "}
                <div className="loading-overlay fade-in">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="text-center ringPosition position-relative d-flex align-items-center gap-5 flex-column">
                      <div>
                        <div className="loading-ring "></div>
                        <img
                          src="/images/logo.jpg"
                          alt="Loading..."
                          width={150}
                          height={150}
                          className="loading-img"
                        />
                      </div>
                      <div className="loadingText ps-3">{t("loading")}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <ProductProduct
                  products={products}
                  searchTerm={currentSearch}
                  selectedCategory={currentCategory}
                  pagination={pagination}
                  locale={locale}
                />
                <div className="mt-md-5 mt-3">
                  <DisplayPagination pagination={pagination} locale={locale} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductContainer;
