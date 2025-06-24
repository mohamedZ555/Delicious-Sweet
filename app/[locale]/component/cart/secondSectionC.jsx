"use client"
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../../../../context/authContext";
import "../../../../styles/pagesStyle/cart/Cart.css";
import LastPartCart from "./lastPartCart";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

function SecondSectionC() {
  const [cartData, setCartData] = useState([]);
  const [updatingItems, setUpdatingItems] = useState({});
  const { isLoggedIn, logout } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const t = useTranslations("cart");
  const commonT = useTranslations("common");
  const tableT = useTranslations("tableHeaders");

  const TableHead = [tableT("product"), tableT("price"), tableT("quantity"), tableT("subtotal"), tableT("removeItem")];

  // Show login prompt if user is not logged in
  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "3rem",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            width: "100%",
            border: "2px solid #ffabb8",
          }}
        >
          {/* Shopping Cart Icon */}
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              color: "#ffabb8",
            }}
          >
            🛒
          </div>

          <h1
            style={{
              color: "#ffabb8",
              fontSize: "2rem",
              marginBottom: "1rem",
              fontWeight: "600",
            }}
          >
            {t("title")}
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "1.1rem",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
          >
            {t("description")}
          </p>

          <Link href="/login">
            <button
              className="btn-animated rounded-5"
              style={{
                fontSize: "1.1rem",
                padding: "12px 30px",
                marginBottom: "1rem",
              }}
            >
              {t("loginButton")}
            </button>
          </Link>

          <p
            style={{
              color: "#888",
              fontSize: "0.9rem",
              marginTop: "1rem",
            }}
          >
            {t("noAccount")}{" "}
            <Link
              href="/registration"
              style={{
                color: "#ffabb8",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              {t("signUpHere")}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Optimistically update local cart data while waiting for server response
  const updateLocalCart = (productId, newQuantity) => {
    setCartData(prev => {
      const updatedCart = prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      );
      
      // Recalculate total price
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + (item.itemPrice * item.quantity),
        0
      );
      setTotalPrice(newTotal);
      
      return updatedCart;
    });
  };

  const updateCartItem = async (productId, newQuantity) => {
    if (!isLoggedIn) {
      return;
    }

    if (newQuantity < 1) {
      return;
    }

    setUpdatingItems(prev => ({ ...prev, [productId]: true }));
    
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      if (!token) {
        return;
      }

      // Optimistic UI update
      updateLocalCart(productId, newQuantity);

      const requestBody = {
        productId: productId,
        quantity: newQuantity
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Cart/UpdateCart`,
        { 
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );
      
      if (!res.ok) {
        // Revert optimistic update if failed
        await fetchCartData();
        
        if (res.status === 401) {
          logout();
          return;
        }
        return;
      }

      // Final sync with server
      await fetchCartData();
    } catch (err) {
      console.error('Cart update error:', err);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    } finally {
      setUpdatingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleIncrease = async (productId, currentQuantity) => {
    if (!productId || currentQuantity < 1) {
      return;
    }

    const newQuantity = currentQuantity + 1;
    await updateCartItem(productId, newQuantity);
  };

  const handleDecrease = async (productId, currentQuantity) => {
    if (!productId) {
      return;
    }
    
    if (currentQuantity <= 1) {
      return;
    }

    const newQuantity = currentQuantity - 1;
    await updateCartItem(productId, newQuantity);
  };

  const removeItem = async (id) => {
    if (!isLoggedIn) {
      return;
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        return;
      }

      // Optimistic UI update
      setCartData(prev => prev.filter(item => item.productId !== id));

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Cart/RemoveFromCart/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        // Revert if failed
        await fetchCartData();
        
        if (res.status === 401) {
          logout();
          return;
        }
        return;
      }

      // Final sync with server
      await fetchCartData();
    } catch (err) {
      console.error('Remove item error:', err);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    }
  };

  const fetchCartData = async () => {
    if (!isLoggedIn) {
      return;
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Cart/GetAllByUserId`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          logout();
          return;
        }
        return;
      }

      const results = await res.json();
      const data = results?.data?.cartItemDtos || [];
      setCartData(data);
      setTotalPrice(results?.data?.totalPrice || 0);
    } catch (err) {
      console.error('Fetch cart data error:', err);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartData();
    }
  }, [isLoggedIn]);

  // Show empty cart state
  if (cartData.length === 0) {
    return (
      <main className="container mt-5 pt-5 pb-5 mb-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center empty-cart-container">
              <div className="empty-cart-icon mb-4">
                <i className="fas fa-shopping-cart fa-4x text-muted"></i>
              </div>
              <div className="empty-cart-content">
                <h2 className="fw-bold text-dark mb-3">{t("emptyCartTitle")}</h2>
                <p className="text-muted fs-5 mb-4">
                  {t("emptyCartDescription")}
                </p>
                <div className="empty-cart-actions">
                  <Link
                    href="/product"
                    className="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill"
                  >
                    <i className="fas fa-shopping-bag me-2"></i>
                    {t("startShopping")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="container mt-5 pt-5 pb-5 mb-3">
        <div className="table-responsive">
          <Table className="table table-bordered align-middle text-center mb-0">
            <thead className="table-primary">
              <tr>
                {TableHead.map((item, index) => (
                  <th key={index} className="fw-bold">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartData.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.productNameEn}
                        className="cartIMGS img-fluid rounded mb-2"
                        onError={(e) => {
                          e.target.src = "/images/imagePlaceHolder.jpg";
                        }}
                      />
                      <span className="fw-semibold small text-secondary">
                        {item.productNameEn}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="fs-5">${item.itemPrice.toFixed(0)}</span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger btn-sm px-2 py-1"
                        onClick={() => handleDecrease(item.productId, item.quantity)}
                        aria-label={commonT("decreaseQuantity")}
                        type="button"
                        disabled={item.quantity <= 1 || updatingItems[item.productId]}
                      >
                        {updatingItems[item.productId] ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          "-"
                        )}
                      </button>
                      <span className="mx-2 fw-bold">
                        {String(item.quantity).padStart(2, "0")}
                      </span>
                      <button
                        className="btn btn-outline-primary btn-sm px-2 py-1"
                        onClick={() => handleIncrease(item.productId, item.quantity)}
                        aria-label={commonT("increaseQuantity")}
                        type="button"
                        disabled={updatingItems[item.productId]}
                      >
                        {updatingItems[item.productId] ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          "+"
                        )}
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className="fs-5">
                      ${(item.itemPrice * item.quantity).toFixed(0)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.productId)}
                      aria-label={commonT("removeItem")}
                      type="button"
                      disabled={updatingItems[item.productId]}
                    >
                      <i className="fas fa-trash-alt me-1"></i>
                      {t("remove")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>
      <LastPartCart cart={totalPrice} />
    </>
  );
}

export default SecondSectionC;