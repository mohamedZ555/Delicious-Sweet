"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import "../../../../styles/pagesStyle/order.css";
import { useAuth } from "../../../../context/authContext";
import "../../../../styles/pagesStyle/loading.css";
export default function OrderComp() {
  const t = useTranslations("order");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isLoggedIn } = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Order/GetAllUserOrders?pageNumber=1&pageSize=3&DateRange=thisyear`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchOrders();
    else setLoading(false);
  }, [token]);

  if (loading)
    return (
      <div className="order-loading">
        {" "}
        <div className="loading-overlay fade-in">
          <div className="d-flex align-items-center justify-content-center">
            <div className="text-center ringPosition position-relative d-flex align-items-center gap-5 flex-column">
              <div>
                <div className="loading-ring "></div>
                <img
                  src="/images/logo.jpg"
                  alt="Loading..."
                  width={150}
                  height={150}
                  className="loading-img"
                />
              </div>
              <div className="loadingText ps-3">{t("loading")}</div>
            </div>
          </div>
        </div>
      </div>
    );
  if (error) return <div className="order-error">{t("error")}</div>;
  if (!orders.length) return <div className="order-empty">{t("empty")}</div>;

  return (
    <>
      {isLoggedIn ? (
        <div className="order-page-container">
          <h2 className="order-title">{t("title")}</h2>
          <div className="order-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <span className="order-number">
                    {t("orderNumber")}
                    {order.orderNumber}
                  </span>
                  <span
                    className={`order-status status-${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-meta">
                  <span>
                    {t("placedOn")}:{" "}
                    {new Date(order.createdOn).toLocaleDateString()}
                  </span>
                  <span>
                    {t("payment")}: <b>{order.paymentStatus}</b> (
                    {order.paymentMethod})
                  </span>
                  <span>
                    {t("shipping")}: <b>{order.shippedStatus}</b>
                  </span>
                </div>
                <div className="order-items">
                  <div className="order-items-title">{t("items")}</div>
                  {order.orderItems.map((item, idx) => (
                    <div className="order-item" key={idx}>
                      <span className="item-name">{item.productNameEn}</span>
                      <span className="item-qty">
                        {t("quantity")}: x{item.quantity}
                      </span>
                      <span className="item-price">
                        {t("price")}: {item.itemPrice} {t("egp")}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  {t("total")}:{" "}
                  <b>
                    {order.totalAmount} {t("egp")}
                  </b>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="order-empty">{t("loginFirst")}</div>
      )}
    </>
  );
}
