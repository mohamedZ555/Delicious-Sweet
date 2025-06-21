import React from "react";
import ContactForm from "./ContactForm";
import "../../../../styles/pagesStyle/contactUs.css";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import ContactMap from "./ContactMap";
import { useTranslations } from "next-intl";

const ContactUsContainer = () => {
  const t = useTranslations("contact");
  return (
    <>
      <div className="container py-sm-5 pt-md-3">
        <div className="row py-lg-5 my-lg-3">
          <div className="col-12 col-md-5 d-flex flex-column gap-4 gap-lg-3 gap-xl-4">
            <div className="mainText text-capitalize pe-1">
              {t("title")}
            </div>
            <div className="subText text-capitalize mt-3">
              {t("description")}
            </div>
            <div>
              <div className="subText text-capitalize mt-3 d-flex align-items-center">
                <span className="me-3 fs-5 fw-bold">
                  <FiPhone />
                </span>
                <span>{t("phone.value")}</span>
              </div>
              <div className="subText text-capitalize mt-3 d-flex align-items-center">
                <span className="me-3 fs-5 fw-bold">
                  <SlLocationPin />
                </span>
                <span>{t("address.value")}</span>
              </div>
              <div className="subText text-capitalize mt-3 d-flex align-items-center">
                <span className="me-3 fs-5 fw-bold">
                  @
                </span>
                <span>{t("email.value")}</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 ms-md-auto my-4 mt-md-3">
            <ContactForm/>
          </div>
        </div>
      </div>
      <div className="mapBG">
        <ContactMap />
      </div>
    </>
  );
};

export default ContactUsContainer;
