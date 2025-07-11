"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../../../context/authContext";
import "../../../../styles/pagesStyle/switcher.css";
export default function LogButton() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("logButton");
  const { logout , isLoggedIn} = useAuth();
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsAuthenticated(!!storedToken);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      setIsAuthenticated(!!newToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleClick = () => {
    const currentLocale =
      routing.locales.find((l) => pathname.startsWith(`/${l}`)) ||
      routing.defaultLocale;

    if (isLoggedIn) {
        logout();
    } else {
      router.push(`/${currentLocale}/login`);

      const checkLogin = setInterval(() => {
        const newToken = localStorage.getItem("token");
        if (newToken) {
          clearInterval(checkLogin);
          setToken(newToken);
          setIsAuthenticated(true);
        }
      }, 500);
    }
  };

  return (
    <div className="btn-group">
      {!isMobile ? (
        <>
          <div
            className="dropdown-toggle text-black fs-4 d-flex align-items-center justify-content-center"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <CgProfile />
          </div>
          <ul className="dropdown-menu px-2">
            {isLoggedIn && (
              <>
              <li>
                <Link
                  className="dropdown-item profileBTN text-center mb-1 py-2 px-3 fs-6 border-black fw-bold"
                  href="/orders"
                >
                  {t("orders")}
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item profileBTN text-center py-2 px-3 fs-6 border-black fw-bold"
                  href="/profile"
                >
                  {t("profile")}
                </Link>
              </li>
              </>
            )}

            <li
              className="z-3 px-3 py-2 logOutBTN rounded-3 mt-1"
              onClick={handleClick}
            >
              {isLoggedIn ? t("logout") : t("login")}
            </li>
          </ul>
        </>
      ) : (
        // Mobile view
        <>
          <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
            <div>
              {isLoggedIn && (
                <div className="mb-3 ">
                  <Link className="Profe px-5 py-2 rounded-5" href="/orders">
                    {t("orders")}
                  </Link>
                </div>
              )}
            </div>
            <div>
              {isLoggedIn && (
                <div className="mb-2 ">
                  <Link className="Profe px-5 py-2 rounded-5" href="/profile">
                    {t("profile")}
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button className="loginBTN px-5 rounded-5 py-1" onClick={handleClick}>
                {isLoggedIn ? t("logout") : t("login")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
