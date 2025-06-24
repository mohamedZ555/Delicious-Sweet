"use client";
import { Link } from "@/i18n/routing";
import { Navbar, Nav } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import LogButton from "./logButton";
import styles from "@/styles/pagesStyle/nav.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import WishlistBadge from "./WishlistBadge";
import { useTranslations } from "next-intl";

function NaviBar() {
  const t = useTranslations("navPart");
  const navbarT = useTranslations("navbar");

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${styles.contNav} col-12 `}
    >
      <div className="bgs container-lg d-flex align-items-center ">
        <div className="contLogo d-flex d-lg-block justify-content-between align-items-center col-12 col-lg-2">
          <Link
            href="/"
            className={`navbar-brand fw-bold ${styles.iconLogo} text-black`}
          >
            {navbarT("brandName")}
          </Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="bg-white"
          />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav" className="collapsBG ">
          <Nav className="gap-4 justify-content-center w-100 m-auto mt-3 d-flex align-items-center  ">
            <Link href="/" className={styles.navLinks}>
              {t("home")}
            </Link>
            <Link href="/contact-us" className={styles.navLinks}>
              {t("contact")}
            </Link>
            <Link href="/about-us" className={styles.navLinks}>
              {t("about")}
            </Link>
            <Link href="/product" className={styles.navLinks}>
              {t("product")}
            </Link>
          </Nav>
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-center justify-content-end text-center my-3 w-auto">
            <div className="d-flex align-items-center justify-content-center">
              <WishlistBadge />
            </div>
            <div className="d-flex align-items-center justify-content-center mx-lg-3 my-2 my-lg-0">
              <Link href="/cart" className="text-black fs-5 position-relative d-flex align-items-center">
                <BsCart3 />
              </Link>
            </div>
            <div className="d-flex align-items-center justify-content-center mx-lg-2 my-2 my-lg-0">
              <LanguageSwitcher />
            </div>
            <div className="d-flex align-items-center justify-content-center mx-lg-2 my-2 my-lg-0">
              <LogButton />
            </div>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NaviBar;
