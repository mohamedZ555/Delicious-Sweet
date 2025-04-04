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
      className={`${styles.contNav} col-12 pt-4 pb-3`}
    >
      <div className="bgs container-lg d-flex align-items-center w-100 col-lg-10">
        <div className="contLogo d-flex d-lg-block justify-content-between align-items-center col-12 col-lg-3">
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
        <Navbar.Collapse id="responsive-navbar-nav" className="collapsBG">
          <Nav className="me-auto d-flex align-items-center ps-lg-1">
            <Link href="/" className="nav-link shagr">
              Home
            </Link>
            <Link href="/#" className="nav-link shagr">
              About
            </Link>
            <Link href="/login" className="nav-link shagr">
              Sign In
            </Link>
            <Link href="/register" className="nav-link shagr">
               Register
            </Link>
          </Nav>
          <div className="contcallus d-lg-flex align-items-center justify-content gap-3">
            <div className=" position-relative">
              <input
                className={`${styles.iner} px-3 py-2 rounded`}
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
