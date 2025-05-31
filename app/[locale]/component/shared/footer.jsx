import {
  FaGoogle,
  FaFacebookF,
  FaFacebookMessenger,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import Image from "next/image";
import { CiInstagram } from "react-icons/ci";
import "../../../../styles/pagesStyle/footer.css";
import { useTranslations } from "next-intl";


export default function Footer() {
     const t =  useTranslations("footer");
 

  return (
    <footer className="text-light py-4 mt-auto">
      <div className="container text-center">
        <div className="row">
          <div className="col-12 my-3">
            <Image
              src="/images/logo.jpg"
              alt="logo"
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="col-12 mt-3 mb-3">
            <h2 className="text-white">Delicious Sweets</h2>
          </div>
          <div className="col-12 mb-4">
            <p className="text-white">
              {t("info")}
            </p>
          </div>
        </div>

        <div className="row">
          <div className=" d-flex align-items-center justify-content-center gap-5 mb-5">
            <a
              className="footerLinks"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGoogle />
            </a>
            <a
              className="footerLinks"
              href="tel:+201124788758"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhoneAlt />
            </a>
            <a
              className="footerLinks"
              href="https://www.facebook.com/profile.php?id=100063773178711"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              className="footerLinks"
              href="https://www.facebook.com/messages/t/104493548261061/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookMessenger />
            </a>
            <a
              className="footerLinks"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CiInstagram />
            </a>
            <a
              className="footerLinks"
              href="https://l.facebook.com/l.php?u=https%3A%2F%2Fg.co%2Fkgs%2Fs5Tj168%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR4r2czuMnP8H2VLh6mEu27uBHm03hJ84tAg6S6MY7dq1qbYjvrnBfVXYShhLA_aem_ez9itWInGNO0XOuEw-PPtQ&h=AT2fZuAiBEZ-C3OSsIIJ7SLlZ45d7yWAL-_NFRUS_on3OvmxuO-SoGiymATN8CaqD7YYFnIZGpRU_1MGcqVmn3RktbpauGMoineEvSeUGHf7fAgHfs3hVuqne5LXebAi9XqbiNu-p0b5nzcf&__tn__=-UK-R&c[0]=AT0lwv2F7pq4hSI_p-6DbU44tSOkJcS9pyC62syMTou0KNE8CcMONTC_t2rdOvQYJv7pH1oSYFW3tAyg1AGotLzl9dkalb67o2GlYdXIUmUuigEaA8cpQ83JwVEJyoR5YWmmFqHgyckWB0ZVr9jSfZaL96nKF-dp0fSA_PQMdy_SJkMFh_ACnBaLMhawlDX3sabl5a_AXtJqdcaxyxNcsHgzNQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
