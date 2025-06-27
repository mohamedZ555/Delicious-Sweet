import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const ErrorModal = ({ message, onClose }) => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.3)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <div style={{
      background: "#fff",
      borderRadius: 16,
      minWidth: 300,
      maxWidth: 400,
      boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
      padding: "2rem 1.5rem 1.5rem 1.5rem",
      position: "relative",
      textAlign: "center"
    }}>
      <div style={{
        background: "#ffabb8",
        color: "#fff",
        borderRadius: "12px 12px 0 0",
        padding: "0.75rem 1rem",
        fontWeight: 700,
        fontSize: 20,
        margin: "-2rem -1.5rem 1.5rem -1.5rem"
      }}>
        Error
      </div>
      <div style={{ color: "#dc3545", fontWeight: "bold", marginBottom: 24 }}>{message}</div>
      <button
        onClick={onClose}
        style={{
          background: "#ffabb8",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "0.5rem 1.5rem",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer"
        }}
        aria-label="Close error dialog"
      >
        Close
      </button>
    </div>
  </div>
);

const CheckoutButton = () => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const t = useTranslations("lastPartCart");

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  const handleCheckout = async () => {
    setLoading(true);
    setPaymentUrl(null);
    setError("");
    const token = localStorage.getItem("token");
    try {
      // 1. Get address
      const addressRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Addresses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const addressData = await addressRes.json();
      const addressId = addressData.data?.[0]?.id;
      if (!addressId) throw new Error(t("noAddress", { defaultValue: "No address found" }));

      // 2. Create order
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Order/CreateOrder`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethod: 0,
            addressId: addressId,
          }),
        }
      );
      const orderData = await orderRes.json();
      if (!orderData.data)
        throw new Error(orderData.message || t("orderFailed", { defaultValue: "Order creation failed" }));
      setPaymentUrl(orderData.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      {!paymentUrl ? (
        <>
          <button
            onClick={handleCheckout}
            className="underDecor checkOut border-0 py-3 px-5 text-white fw-bold d-flex align-items-center"
            disabled={loading}
          >
            <i className="fas fa-credit-card me-2"></i>
            {loading ? t("loading", { defaultValue: "Loading..." }) : t("checkout")}
          </button>
          {error && (
            <ErrorModal message={error} onClose={() => setError("")} />
          )}
        </>
      ) : (
        <div>
          <a
            href={paymentUrl}
            className="underDecor border-0 checkOut py-3 px-5 text-white fw-bold d-flex align-items-center"
            style={{ display: "inline-block" }}
          >
            <i className="fas fa-credit-card me-2"></i>
            {t("checkout")}
          </a>
        </div>
      )}
    </>
  );
};

export default CheckoutButton;
