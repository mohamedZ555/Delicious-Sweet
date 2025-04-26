import { useTranslations } from "next-intl";
import "../../../../styles/pagesStyle/Blog/sideBar.css";
import { FaArrowRight } from "react-icons/fa";
import Search from "../shared/search";

const SideBar = ({ setSearchTerm, setSelectedCategory, categoryData }) => {
  const t = useTranslations("product");

  const resetFilters = () => {
    setSelectedCategory("");
    setSearchTerm("");
  };

  const handleCategoryClick = (categoryID) => {
    setSelectedCategory(categoryID);
    setSearchTerm("");
  };

  return (
    <main className="col-12 col-sm-6 col-md-5 col-xl-3 col-lg-4">
      <div className="d-flex flex-column gap-lg-5 gap-4">
        <Search setSearchTerm={setSearchTerm} />
        <div className="p-lg-4 p-3 monsterBorder">
          <div className="fw-bold sideBarTitle pb-lg-4 pb-3">{t("categoryTitle")}</div>
          <div className="d-flex flex-column gap-2">
            <div
              className="d-flex align-items-center gap-2 postLinkss py-lg-3 py-2 monsterBorder px-lg-4 px-2 text-capitalize"
              onClick={resetFilters}
            >
              <div className="d-flex align-items-center">
                <FaArrowRight className="sideBarArrow" />
              </div>
              {t("allCategories")}
            </div>
            {categoryData && categoryData.length > 0 ? (
              categoryData.map((category) => (
                <div
                  key={category.id}
                  className="d-flex align-items-center gap-2 postLinkss py-lg-3 py-2 monsterBorder px-lg-4 px-2 text-capitalize"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="d-flex align-items-center">
                    <FaArrowRight className="sideBarArrow" />
                  </div>
                  {category.nameEn}
                </div>
              ))
            ) : (
              <h3 className="w-100 text-center fw-bold">{t("noCategories")}</h3>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SideBar;
