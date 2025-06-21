"use client";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { Navbar, Nav } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import LogButton from "./logButton";
import styles from "@/styles/pagesStyle/nav.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

function NaviBar() {
  const t = useTranslations("navPart");

  const pathname = usePathname(); // Get the current path

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
            Delicious-Sweet
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
          <div className="contcallus ms-auto d-lg-flex align-items-center justify-content gap-3 text-center my-3">
            {/* <div className=" position-relative">
              <input
                className={`${styles.iner} px-3 py-2 rounded`}
                placeholder="What are you looking for?"
                type="text"
              />
              <span className="position-absolute end-0 pt-1 pe-2">
                <FaMagnifyingGlass />
              </span>
            </div> */}
            <hr />
            <Link href="/wishlist" className="pointer text-black d-flex fs-5 ">
              <FaRegHeart />
            </Link>
            <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center py-lg-0 py-1 gap-2 pb-1 pb-lg-0">
              <Link href="/cart" className="underLine text-black fs-5">
                <div className="shoppingCart position-relative fw-bold text-center d-none align-items-center justify-content-center d-lg-flex">
                  <div>
                    <span className="d-flex">
                      <BsCart3 />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <LanguageSwitcher />
            <LogButton />
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NaviBar;
