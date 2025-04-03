"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Nav } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import styles from "@/styles/pagesStyle/nav.module.css";

function NaviBar() {
  const pathname = usePathname(); // Get the current path

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`${styles.contNav} col-12 m-auto pt-4 pb-3`}
    >
      <div className="bgs container-lg d-flex align-items-center w-100 col-lg-10">
        <div className="contLogo d-flex d-lg-block justify-content-between align-items-center col-12 col-lg-4">
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
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="d-flex align-items-center justify-content-between"
        >
          <Nav className="d-flex align-items-center gap-4 gap-lg-5">
            {[
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
              { name: "About", path: "/about" },
              { name: "Sign Up", path: "/register" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link p-0 ${styles.navLinks} ${
                  pathname === link.path ? styles.active : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </Nav>
          <div className="contcallus d-lg-flex align-items-center justify-content gap-3">
            <div className="col-12 position-relative">
              <input
                className={`col-12 ${styles.iner} px-3 py-2 rounded`}
                placeholder="What are you looking for?"
                type="text"
              />
              <span className="position-absolute end-0 pt-1 pe-2">
                <FaMagnifyingGlass />
              </span>
            </div>
            <div className="pointer d-flex fs-5">
              <FaRegHeart />
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center py-lg-0 py-1 gap-2 pb-4 pb-lg-0">
              <Link href="/cart" className="underLine text-black fs-5">
                <div className="shoppingCart position-relative ms-lg-2 fw-bold text-center d-none align-items-center justify-content-center d-lg-flex">
                  <div>
                    <span className="d-flex">
                      <BsCart3 />
                    </span>
                  </div>
                </div>
                <div className="d-lg-none CartText"></div>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NaviBar;
