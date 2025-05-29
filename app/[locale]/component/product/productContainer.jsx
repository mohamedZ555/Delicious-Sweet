"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SideBar from "./SideBar";
import DisplayPagination from "./DisplayPagination";
import ProductProduct from "./productProduct";

function ProductContainer({
  products,
  pagination,
  locale,
  catog,
  currentCategory,
  currentSearch,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductContainer;
