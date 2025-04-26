"use client";

import { useState } from "react";
import SideBar from "./SideBar";
import DisplayPagination from "./pagination";
import "../../../../styles/pagesStyle/Blog/secondSectionBlog.css";
import ProductProduct from "./productProduct";

function ProductContainer({ products, categoryData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(products.length / 9));

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // ✅ Reset pagination when filtering
  };

  return (
    <main className="container py-sm-5 pt-5 pb-3 my-sm-5">
      <section className="row">
        <SideBar
          setSearchTerm={setSearchTerm}
          setSelectedCategory={handleCategoryFilter}
          categoryData={categoryData}
        />
        <div className="col-12 col-sm-6 col-md-7 col-xl-9 col-lg-8">
          <div className="ps-lg-5 ps-sm-4 p-0 mt-4 mt-sm-0">
            <ProductProduct
              products={products}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setTotalPages={setTotalPages}
            />
            <div className="mt-md-5 mt-3">
              <DisplayPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductContainer;
