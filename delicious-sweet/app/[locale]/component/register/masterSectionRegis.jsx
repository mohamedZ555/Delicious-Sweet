"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import "@/styles/login.css";
import { Link, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export default function Registration() {
  const t = useTranslations("register");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError(t("passwordMismatch"));
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            f_name: fName,
            l_name: lName,
            phone: phone,
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return setError(
          data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : t("registrationFailed")
        );
      }

      setSuccess(t("registrationSuccess"));

      // Get the current locale from the pathname
      const currentLocale =
        routing.locales.find((locale) => pathname.startsWith(`/${locale}`)) ||
        routing.defaultLocale;

      setTimeout(() => router.push(`/${currentLocale}/login`), 2000);
    } catch (err) {
      setError(t("errorMessage"));
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
                <img
                  src="/image/iconLogo.png"
                  alt=""
                  className="logoImageLog"
                />
              </div>
              <h2 className="pb-3 pt-4 fw-bold">{t("title")}</h2>
            </div>
            <form className="form-container" onSubmit={handleRegistration}>
              {[
                {
                  label: t("firstName"),
                  state: fName,
                  setState: setFName,
                  type: "text",
                  name: "f_name",
                },
                {
                  label: t("lastName"),
                  state: lName,
                  setState: setLName,
                  type: "text",
                  name: "l_name",
                },
                {
                  label: t("phone"),
                  state: phone,
                  setState: setPhone,
                  type: "tel",
                  name: "phone",
                },
                {
                  label: t("email"),
                  state: email,
                  setState: setEmail,
                  type: "email",
                  name: "email",
                },
                {
                  label: t("password"),
                  state: password,
                  setState: setPassword,
                  type: "password",
                  name: "password",
                },
                {
                  label: t("confirmPassword"),
                  state: confirmPassword,
                  setState: setConfirmPassword,
                  type: "password",
                  name: "confirmPassword",
                },
              ].map(({ label, state, setState, type, name }) => (
                <div className="input-container" key={name}>
                  <label htmlFor={name} className="mb-1 logLabel">
                    {label} *
                  </label>
                  <input
                    className="inputs"
                    placeholder={label}
                    name={name}
                    type={type}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
              ))}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <button
                type="submit"
                className="sign-in-btn py-3 w-100 fw-bold fs-5 mt-2"
              >
                {t("register")}
              </button>
              <div className="input-container sign-container my-3">
                <Link className="sign-up-btn fw-semibold" href="/login">
                  {t("alreadyHaveAccount")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
