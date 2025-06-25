import "../../../styles/pagesStyle/loading.css";
import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
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
  );
}
