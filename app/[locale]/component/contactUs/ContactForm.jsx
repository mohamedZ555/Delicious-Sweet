"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

const ContactPopUpForm = () => {
  const t = useTranslations("ContactPage");
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = () => {
      try {
        if (typeof window !== "undefined") {
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            setToken(storedToken);
          }
        }
      } catch (error) {
        setStatus({
          type: "danger",
          message: t("form.tokenAccessError"),
        });
      }
    };

    getToken();
  }, [t]);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return t("form.emailRequired");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return t("form.emailInvalid");
        return "";
      case "message":
        if (!value) return t("form.messageRequired");
        if (value.trim().length < 10) return t("form.messageTooShort");
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    if (!token) {
      setStatus({
        type: "danger",
        message: t("form.authError"),
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ContactUs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: formData.email,
            subject: formData.message,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t("form.error"));
      }

      setStatus({ type: "success", message: t("form.success") });
      setFormData({ email: "", message: "" });
      setErrors({ email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "danger",
        message: error.message || t("form.error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="position-relative needs-validation"
    >
      <div className="d-flex flex-column gap-3">
        {/* Email Field */}
        <div className="col-md-12">
          <input
            className={`py-3 rounded-4 px-4 border w-100 contactInput ${
              errors.email ? "is-invalid border-danger" : ""
            }`}
            type="email"
            placeholder={t("form.email")}
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={isSubmitting}
            aria-describedby="emailHelp"
          />
          {errors.email && (
            <div className="invalid-feedback" id="emailHelp">
              {errors.email}
            </div>
          )}
        </div>

        {/* Message Field */}
        <div className="col-md-12">
          <textarea
            className={`py-3 rounded-4 px-4 w-100 border contactInput ContactTxtArea text-capitalize ${
              errors.message ? "is-invalid border-danger" : ""
            }`}
            placeholder={t("form.message")}
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={isSubmitting}
            rows="4"
            aria-describedby="messageHelp"
          />
          {errors.message && (
            <div className="invalid-feedback" id="messageHelp">
              {errors.message}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="sendBTN py-3 rounded-5 mt-3 w-100"
        type="submit"
        disabled={isSubmitting || !token}
        aria-label={t("form.submit")}
      >
        {isSubmitting ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            {t("form.submitting")}
          </>
        ) : (
          t("form.submit")
        )}
      </button>

      {/* Status Message */}
      {status && (
        <div
          className={`alert alert-${status.type} mt-3 position-absolute w-100`}
          role="alert"
        >
          {status.message}
        </div>
      )}

      {/* Token warning */}
      {!token && (
        <div className="alert alert-warning mt-3" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {t("form.tokenWarning")}
        </div>
      )}
    </form>
  );
};

export default ContactPopUpForm;
