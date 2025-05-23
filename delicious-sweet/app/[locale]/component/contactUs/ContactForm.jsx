"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
const ContactPopUpForm = () => {
  const t = useTranslations("ContactPage");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [validity, setValidity] = useState({
    name: null,
    email: null,
    message: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newValidity = {
      name: /^[A-Za-z\s]{2,}$/.test(formData.name),
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      message: formData.message.trim().length >= 10,
    };
    setValidity(newValidity);
    return Object.values(newValidity).every((valid) => valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          subject: "Popup Form Message",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setStatus({ type: "success", message: t("form.success") });
        setFormData({ name: "", email: "", message: "" });
        setValidity({ name: null, email: null, message: null });
      } else {
        setStatus({
          type: "danger",
          message: t("form.error"),
        });
      }
    } catch (error) {
      setStatus({
        type: "danger",
        message: t("form.error"),
      });
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3000);
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
        {/* Name */}
        {/* <div className="col-md-12">
          <input
            className={`py-3 rounded-4 px-4 w-100 border text-capitalize ${
              validity.name === false ? "is-invalid  border-danger" : "contactInput"
            }`}
            type="text"
            placeholder={t("form.name")}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {validity.name === false && (
            <div className="invalid-feedback">
              {t("form.nameError")}
            </div>
          )}
        </div> */}

        {/* Email */}
        <div className="col-md-12">
          <input
            className={`py-3 rounded-4 px-4 border w-100 contactInput ${
              validity.email === false ? "is-invalid  border-danger" : ""
            }`}
            type="email"
            placeholder={t("form.email")}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {validity.email === false && (
            <div className="invalid-feedback">{t("form.emailError")}</div>
          )}
        </div>

        {/* Message */}
        <div className="col-md-12">
          <textarea
            className={`py-3 rounded-4 px-4 w-100 border contactInput ContactTxtArea text-capitalize ${
              validity.message === false ? "is-invalid  border-danger" : ""
            }`}
            placeholder={t("form.message")}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {validity.message === false && (
            <div className="invalid-feedback">{t("form.messageError")}</div>
          )}
        </div>
      </div>

      {/* Submit */}
      <button className="sendBTN py-3 rounded-5 mt-3 w-100" type="submit">
        {t("form.submit")}
      </button>

      {/* Status */}
      {status && (
        <div
          className={`alert alert-${status.type} mt-3 position-absolute w-100`}
          role="alert"
        >
          {status.message}
        </div>
      )}
    </form>
  );
};

export default ContactPopUpForm;
