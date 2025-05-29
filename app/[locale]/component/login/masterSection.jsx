"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import "../../../../styles/pagesStyle/login.css";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export default function Login() {
  const t = useTranslations("login");
  const [formData, setFormData] = useState({ input: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.input,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || t("loginFailed"));
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      const currentLocale = routing.locales.find((l) =>
        pathname.startsWith(`/${l}`)
      ) || routing.defaultLocale;

      router.push(`/${currentLocale}/`);
    } catch (err) {
      setError(err.message || t("errorMessage"));
    }
  };

  return (
    <main>
      <section className="main-container my-5 py-5">
        <div className="form-wrapper mt-5">
          <div className="form p-5 position-relative">
            <div className="form-header text-center">
              <div className="customLogoLog overflow-hidden d-flex align-items-center justify-content-center fw-bold text-white">
                <img src="/images/logo.jpg" alt="" className="h-100 w-100 z-3 position-relative" />
              </div>
              <h2 className="pb-3 pt-4 fw-bold">{t("title")}</h2>
            </div>
            <form className="form-container" onSubmit={handleLogin}>
              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="input-container">
                <label htmlFor="input" className="mb-1 logLabel">{t("email")}</label>
                <input
                  className="inputs"
                  placeholder={t("emailPlaceholder")}
                  name="input"
                  type="email"
                  value={formData.input}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="password" className="mb-1 logLabel">{t("password")}</label>
                <input
                  className="inputs"
                  placeholder={t("passwordPlaceholder")}
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="d-flex gap-2 me-auto align-items-center">
                <input type="checkbox" id="check"></input>
                <label className="logLabel" htmlFor="check">{t("rememberMe")}</label>
              </div>

              <button type="submit" className="sign-in-btn py-3 w-100 fw-bold fs-5 mt-1">
                {t("login")}
              </button>

              <div className="w-100 my-3">
                <div className="input-container sign-container">
                  <Link className="sign-up-btn fw-semibold" href="/registration">
                    {t("createAccount")}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
