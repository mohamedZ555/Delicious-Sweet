"use client";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import { useEffect } from "react";
// import "@/styles/navBar/navBar.css";
// import LogButton from "./logButton";
// import LanguageSwitcher from "./LanguageSwitcher"
function NaviBar() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Navbar collapseOnSelect expand="lg" className="contNav col-12 m-auto">
      <div className="bgs container-lg d-flex align-items-center w-100 col-lg-10">
        <div className="contLogo d-flex d-lg-block justify-content-between align-items-center col-12 col-lg-auto">
          <Link href="/" className="navbar-brand fw-bold icon-logo text-black">
            TazZA
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
            <Link href="/about" className="nav-link shagr">
              About
            </Link>
            <Link href="/login" className="nav-link shagr">
              Sign In
            </Link>
            <Link href="/register" className="nav-link shagr">
               Register
            </Link>
          </Nav>
          <div className="contcallus d-lg-flex align-items-center justify-content-center">
            <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center py-lg-0 py-1 gap-2 pb-4 pb-lg-0">
              <Link href="/#" className="underLine ">
                <div className="shoppingCart position-relative ms-lg-2 fw-bold text-center d-none align-items-center justify-content-center d-lg-flex">
                  <div>
                    <BsCart3 />
                    <div className="notification position-absolute rounded-circle d-flex justify-content-center align-items-center">
                      21
                    </div>
                  </div>
                </div>
                <div className="d-lg-none CartText"></div>
              </Link>
              <div>{/* <LogButton /> */}</div>
            </div>
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NaviBar;
