import { useTranslations } from "use-intl";
const RecentPosts = () => {
  const t = useTranslations("blogPage");

  return (
    <div className="monsterBorder p-lg-4 p-3">
      <div className="fw-bold sideBarTitle">{t("recentPost")}</div>
      <hr />
      {[...Array(4)].map((_, index) => (
        <div key={index}>
          <div className="dateColGreen fw-bold">20 April, 2020</div>
          <div className="strawbSideFont fw-semibold">{t("postDescription")}</div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
