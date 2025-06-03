"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import "../../../../styles/pagesStyle/login.css";
import { Link } from "@/i18n/routing";

export default function Registration({ locale }) {
  const t = useTranslations("register");
  const initialFormData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear specific field error when user types
    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
    setApiError(null);
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;

    // First Name validation
    if (!formData.firstName.trim()) {
      errors.firstName = t("firstNameRequired");
    } else if (formData.firstName.length < 2) {
      errors.firstName = t("firstNameTooShort");
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      errors.lastName = t("lastNameRequired");
    } else if (formData.lastName.length < 2) {
      errors.lastName = t("lastNameTooShort");
    }

    // Phone validation
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = t("phoneRequired");
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = t("invalidPhone");
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = t("emailRequired");
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t("invalidEmail");
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = t("addressRequired");
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = t("cityRequired");
    }

    // Password validation
    if (!formData.password) {
      errors.password = t("passwordRequired");
    } else if (formData.password.length < 6) {
      errors.password = t("passwordTooShort");
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = t("passwordComplexity");
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = t("confirmPasswordRequired");
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t("passwordMismatch");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setApiError(null);
    setIsSubmitting(true);

    if (!validate()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Auth/registerUser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            password: formData.password,
          }),
        }
      );

      if (res.ok) {
        const errorData = await res.json();
        let errorMessage = errorData?.messageEn || t("registerFailed");

        if (errorData?.messageEn === "Email already Exist") {
          errorMessage = t("emailExists");
        } else if (errorData?.messageEn.includes("Passwords must have")) {
          errorMessage = t("passwordComplexity");
        }

        setApiError(errorMessage);
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      setApiError(t("networkError"));
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      label: t("firstName"),
      name: "firstName",
      type: "text",
      error: validationErrors.firstName,
    },
    {
      label: t("lastName"),
      name: "lastName",
      type: "text",
      error: validationErrors.lastName,
    },
    {
      label: t("phone"),
      name: "phoneNumber",
      type: "tel",
      error: validationErrors.phoneNumber,
    },
    {
      label: t("email"),
      name: "email",
      type: "email",
      error: validationErrors.email,
    },
    {
      label: t("address"),
      name: "address",
      type: "text",
      error: validationErrors.address,
    },
    {
      label: t("city"),
      name: "city",
      type: "text",
      error: validationErrors.city,
    },
    {
      label: t("password"),
      name: "password",
      type: "password",
      error: validationErrors.password,
    },
    {
      label: t("confirmPassword"),
      name: "confirmPassword",
      type: "password",
      error: validationErrors.confirmPassword,
    },
  ];

  return (
    <main>
      <section className="main-container my-5 py-5">
        <div className="form-wrapper mt-5">
          <div className="form p-5 position-relative">
            <div className="form-header text-center">
              <div className="customLogoLog overflow-hidden d-flex align-items-center justify-content-center fw-bold text-white">
                <img
                  src="/images/logo.jpg"
                  alt=""
                  className="h-100 w-100 z-3 position-relative"
                />
              </div>
              <h2 className="pb-3 pt-4 fw-bold">{t("title")}</h2>
            </div>
            <form className="form-container" onSubmit={handleRegister}>
              {fields.map(({ label, name, type, error }) => (
                <div className="input-container" key={name}>
                  <label htmlFor={name} className="mb-1 logLabel">
                    {label} *
                  </label>
                  <input
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    placeholder={label}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                  />
                  {error && (
                    <div
                      className={`${
                        error === "SuccesFully Added"
                          ? "text-success"
                          : "text-danger"
                      } mb-0`}
                    >
                      {error}
                    </div>
                  )}
                </div>
              ))}

              {apiError && (
                <div
                  className={`${
                    apiError === "SuccesFully Added"
                      ? "text-success"
                      : "text-danger"
                  }  mb-0`}
                >
                  {apiError}
                </div>
              )}

              <button
                type="submit"
                className="sign-in-btn py-3 w-100 fw-bold fs-5 mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t("registering")}
                  </>
                ) : (
                  t("register")
                )}
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
