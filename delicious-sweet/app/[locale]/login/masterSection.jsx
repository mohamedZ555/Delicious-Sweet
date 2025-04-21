"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import "@/styles/login.css";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export default function Login() {
  const t = useTranslations("login");
  const [formData, setFormData] = useState({ input: "", password: "" });
  const [type, setType] = useState("email"); // Default to email
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname()
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_or_phone: formData.input,
          password: formData.password,
          type,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || t("loginFailed"));
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // Store token in localStorage
      const currentLocale = routing.locales.find((l) =>
        pathname.startsWith(`/${l}`)
      ) || routing.defaultLocale;
  
      router.push(`/${currentLocale}/profile`);
    } catch (err) {
      setError(err.message || t("errorMessage"));
    }
  };

  return (
    <main className="pt-5">
      <section className="main-container my-5 py-5">
        <div className="form-wrapper pt-5 mt-5">
          <div className="form p-5 position-relative">
            <div className="form-header text-center">
              <div className="customLogoLog d-flex align-items-center justify-content-center fw-bold text-white">
                <div className="logoTextlog">TazZA</div>
                <img src="/image/iconLogo.png" alt="" className="logoImageLog" />
              </div>
              <h2 className="pb-3 pt-4 fw-bold">{t("title")}</h2>
            </div>
            <form className="form-container" onSubmit={handleLogin}>
              {error && <p style={{ color: "red" }}>{error}</p>}

              {/* Email/Phone Input */}
              <div className="input-container">
                <label htmlFor="input" className="mb-1 logLabel">{t("email")}</label>
                <input
                  className="inputs"
                  placeholder={type === "email" ? t("emailPlaceholder") : t("phonePlaceholder")}
                  name="input"
                  type={type === "email" ? "email" : "tel"}
                  value={formData.input}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password Input */}
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

              {/* Remember Me */}
              <div className="d-flex gap-2 me-auto align-items-center">
                <input type="checkbox" id="check"></input>
                <label className="logLabel" htmlFor="check">{t("rememberMe")}</label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="sign-in-btn py-3 w-100 fw-bold fs-5 mt-1">
                {t("login")}
              </button>

              {/* Links */}
              <div className="d-flex align-items-center justify-content-between w-100 my-3">
                <div className="input-container sign-container">
                  <Link className="sign-up-btn fw-semibold" href="/registration">
                    {t("createAccount")}
                  </Link>
                </div>
                <div className="input-container sign-container d-flex align-items-center justify-content-end">
                  <div className="sign-up-btn fw-semibold">{t("forgotPassword")}</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
