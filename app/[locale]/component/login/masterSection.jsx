"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import "../../../../styles/pagesStyle/login.css";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useAuth } from "@/context/authContext";

export default function Login() {
  const t = useTranslations("login");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { login, authError } = useAuth();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = t("emailRequired");
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t("invalidEmail");
    }

    if (!formData.password) {
      errors.password = t("passwordRequired");
    } else if (formData.password.length < 6) {
      errors.password = t("passwordMinLength");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.messageEn || t("loginFailed"));
        return;
      }

      if (!data.token) {
        setError(data.messageEn);
        return;
      }

      const loginSuccess = login(data.token);
      if (!loginSuccess) {
        setError(authError || t("loginFailed"));
        return;
      }

      const currentLocale =
        routing.locales.find((l) => pathname.startsWith(`/${l}`)) ||
        routing.defaultLocale;

      router.push(`/${currentLocale}/`);
    } catch (err) {
      setError(err.messageEn || t("errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="main-container my-5 py-5">
        <div className="form-wrapper mt-5">
          <div className="form p-5 position-relative">
            <div className="form-header text-center">
              <div className="customLogoLog overflow-hidden d-flex align-items-center justify-content-center fw-bold text-white">
                <img
                  src="/images/logo.jpg"
                  alt="logo"
                  className="h-100 w-100 z-3 position-relative"
                />
              </div>
              <h2 className="pb-3 pt-4 fw-bold">{t("title")}</h2>
            </div>

            <form className="form-container" onSubmit={handleLogin}>

              <div className="input-container">
                <label htmlFor="email" className="mb-1 logLabel">
                  {t("email")}
                </label>
                <input
                  className={`inputs ${
                    validationErrors.email ? "is-invalid" : ""
                  }`}
                  placeholder={t("emailPlaceholder")}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-describedby="emailHelp"
                  aria-invalid={!!validationErrors.email}
                />
                {validationErrors.email && (
                  <div className="text-danger" id="emailHelp">
                    {validationErrors.email}
                  </div>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="password" className="mb-1 logLabel">
                  {t("password")}
                </label>
                <div className="position-relative">
                  <input
                    className={`inputs w-100 ${
                      validationErrors.password ? "is-invalid" : ""
                    }`}
                    placeholder={t("passwordPlaceholder")}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    aria-describedby="passwordHelp"
                    aria-invalid={!!validationErrors.password}
                  />
                  <button
                    type="button"
                    className="btn btn-sm position-absolute end-0 top-50 translate-middle-y me-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {validationErrors.password && (
                  <div className="text-danger" id="passwordHelp">
                    {validationErrors.password}
                  </div>
                )}
              </div>
              {error && (
                <div className="text-danger me-auto" role="alert">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="sign-in-btn py-3 w-100 fw-bold fs-5 mt-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t("loggingIn")}
                  </>
                ) : (
                  t("login")
                )}
              </button>

              <div className="w-100 my-3">
                <div className="input-container sign-container">
                  <Link
                    className="sign-up-btn fw-semibold"
                    href="/registration"
                  >
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