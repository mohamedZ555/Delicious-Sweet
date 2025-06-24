import "../../../../styles/pagesStyle/about.css";
import { useTranslations } from "next-intl";

export default function AboutComp() {
  const t = useTranslations("aboutPage");
  const commonT = useTranslations("common");

  return (
    <section className="about">
      <div className="container">
        {/* First Row */}
        <div className="row pt-5 align-items-md-center">
          <div className="col-md-6 ">
            <h2 className="text">{t("welcomeTitle")}</h2>
            <p className="mt-4 mt-md-0">
              {t("welcomeDescription")}
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/images/bannar.jpg"
              alt={commonT("shopBanner")}
              height={300}
              className="w-100 rounded"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="row py-md-5 py-4 align-items-md-center flex-column-reverse flex-md-row">
          <div className="col-md-6 text-center">
            <img
              src="/images/banner2.jpg"
              alt={commonT("sweetBox")}
              height={300}
              className="w-100 rounded"
            />
          </div>
          <div className="col-md-6 ">
            <h2 className="text">{t("sweetBoxTitle")}</h2>
            <p className="mt-4 mt-md-0">
              {t("sweetBoxDescription")}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="row">
          <div className="col-12 mb-5">
            <h2 className="text text-center mt-5 mb-4">{t("storeLocationTitle")}</h2>
          </div>
        </div>
      </div>
      <div
        className="w-100"
        style={{
          height: "300px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <iframe
          title={commonT("storeLocation")}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.4050007184273!2d31.498717974640808!3d30.254039708611337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145805fc7f36e021%3A0xf8377a8384eb6429!2z2YPYsdmK2KrZitmBINmF2YjZhA!5e0!3m2!1sen!2seg!4v1748035048649!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
