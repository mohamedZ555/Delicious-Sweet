"use client";

import { useTranslations } from "next-intl";
import SearchBar from "../shared/search";
import "../../../../styles/pagesStyle/Blog/sideBar.css";
const SideBar = ({
  onSearch,
  setSelectedCategory,
  catog,
  selectedCategory,
  locale,
}) => {
  const t = useTranslations("Product");

  const resetFilters = () => {
    setSelectedCategory("");
    onSearch("");
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <main className="col-12 col-sm-6 col-md-5 col-xl-3 col-lg-4">
      <div className="d-flex flex-column gap-3">
        <SearchBar onSearch={onSearch} locale={locale} />

        <div className="monsterBorder p-4 rounded-4">
          <div className="fw-bold fs-3 text-capitalize mb-2">{t("cat")}</div>

          <div
            className={`fs-20p text-capitalize my-3 pointer ${
              !selectedCategory ? "activeSubTitle" : "nonActiveSubTitle"
            }`}
            onClick={resetFilters}
          >
            {t("allCats")}
          </div>
          <div className="categoryLine"></div>
          {catog?.map((category, index) => (
            <div key={category.id}>
              <div
                className={`fs-20p text-capitalize mt-3 ${
                  index !== catog?.length - 1 ? "mb-3" : ""
                } pointer ${
                  selectedCategory == category.id
                    ? "activeSubTitle"
                    : "nonActiveSubTitle"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {locale === "ar" ? category.nameAr : category.nameEn}
              </div>
              {index !== catog?.length - 1 && (
                <div className="categoryLine"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SideBar;
