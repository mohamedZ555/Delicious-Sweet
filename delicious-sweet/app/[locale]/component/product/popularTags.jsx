import "../../../../styles/pagesStyle/Blog/sideBar.css";
import { useTranslations } from "next-intl";

const PopularTags = () => {
  const t = useTranslations("popularTags");

  return (
    <div className="p-lg-4 p-3 pe-4 monsterBorder w-100">
      <div className="fw-bold sideBarTitle">{t("title")}</div>
      <hr />
      <div className="d-flex gap-2 text-center mb-2">
        <div className="col-5">
          <div className="popularTags">{t("agency")}</div>
        </div>
        <div className="col-7">
          <div className="popularTags">{t("business")}</div>
        </div>
      </div>
      <div className="d-flex gap-2 text-center mb-2">
        <div className="col-7">
          <div className="popularTags">{t("organicFood")}</div>
        </div>
        <div className="col-5">
          <div className="popularTags">{t("farmer")}</div>
        </div>
      </div>
      <div className="d-flex gap-2 text-center mb-2">
        <div className="col-5">
          <div className="popularTags">{t("marketing")}</div>
        </div>
        <div className="col-7">
          <div className="popularTags">{t("company")}</div>
        </div>
      </div>
      <div className="d-flex gap-2 text-center">
        <div className="col-7">
          <div className="popularTags">{t("food")}</div>
        </div>
        <div className="col-5">
          <div className="popularTags">{t("services")}</div>
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
