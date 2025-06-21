"use client"
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../../../../context/authContext";
import "../../../../styles/pagesStyle/cart/Cart.css";
import LastPartCart from "./lastPartCart";
import { Link } from "@/i18n/routing";
const TableHead = [ "Product", "Price", "Quantity", "Subtotal", "Remove Item"];

function SecondSectionC() {
  const [quantities, setQuantities] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn, logout } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);

  const removeItem = async (id) => {
    if (!isLoggedIn) {
      setError("Please login to view your cart");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      if (!token) {
        throw new Error("No authentication token available");
      }

      // Try with POST method first (some APIs use POST for delete operations)
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Cart/RemoveFromCart/${id}`,
        { 
          method: "POST",
          cache: "no-store",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      
      // If POST doesn't work, try DELETE
      if (res.status === 405) {
        res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Cart/RemoveFromCart/${id}`,
          { 
            method: "DELETE",
            cache: "no-store",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );
      }
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        if (res.status === 400) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `Invalid request for item ID: ${id}`);
        }
        throw new Error(`API Error: ${res.status}`);
      }

      // Refresh cart data after successful removal
      await fetchCartData();
    } catch (err) {
      setError(err.message);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCartData = async () => {
    if (!isLoggedIn) {
      setError("Please login to view your cart");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      if (!token) {
        throw new Error("No authentication token available");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Cart/GetAllByUserId`,
        { 
          cache: "no-store",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        throw new Error(`API Error: ${res.status}`);
      }
      
      const results = await res.json();
      const data = results?.data?.cartItemDtos || [];
      setCartData(data);
      setTotalPrice(results?.data?.totalPrice || 0);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("Unauthorized")) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };
//   Call fetchCartData when component mounts and user is logged in
  useEffect(() => {
    if (isLoggedIn) {
  
    fetchCartData();
    }
  }, [isLoggedIn]);

  // Use fetched data or empty array if no data
  const displayData = cartData;

  const handleIncrease = (index) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] += 1;
      return updatedQuantities;
    });
  };

  const handleDecrease = (index) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      if (updatedQuantities[index] > 1) {
        updatedQuantities[index] -= 1;
      }
      return updatedQuantities;
    });
  };

  // Show loading state
  if (loading) {
    return (
      <main className="container mt-5 pt-5 pb-5 mb-3">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading cart...</p>
        </div>
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main className="container mt-5 pt-5 pb-5 mb-3">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          {!isLoggedIn && (
            <>
              <hr />
              <p className="mb-0">
                <a href="/login" className="alert-link">Click here to login</a>
              </p>
            </>
          )}
        </div>
      </main>
    );
  }

  // Show empty cart state
  if (displayData.length === 0) {
    return (
      <main className="container mt-5 pt-5 pb-5 mb-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center empty-cart-container">
              <div className="empty-cart-icon mb-4">
                <i className="fas fa-shopping-cart fa-4x text-muted"></i>
              </div>
              <div className="empty-cart-content">
                <h2 className="fw-bold text-dark mb-3">Your cart is empty!</h2>
                <p className="text-muted fs-5 mb-4">
                  Looks like you haven't added any products to your cart yet. 
                  Start shopping to discover our amazing products!
                </p>
                <div className="empty-cart-actions">
                  <Link 
                    href="/product" 
                    className="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill"
                  >
                    <i className="fas fa-shopping-bag me-2"></i>
                    Start Shopping
                  </Link>
                </div>
                <div className="mt-4">
                  <p className="text-muted small">
                    <i className="fas fa-info-circle me-1"></i>
                    Browse our products and add items to see them here
                  </p>
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
            {displayData.map((item) => {
              return (
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
                      <span className="fw-semibold small text-secondary">{item.productNameEn}</span>
                    </div>
                  </td>
                  <td>
                    <span className="fs-5">${item.itemPrice.toFixed(0)}</span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-outline-danger btn-sm px-2 py-1"
                        onClick={() => handleDecrease(index)}
                        aria-label="Decrease quantity"
                        type="button"
                      >
                        -
                      </button>
                      <span className="mx-2 fw-bold">{String(item.quantity).padStart(2, "0")}</span>
                      <button
                        className="btn btn-outline-primary btn-sm px-2 py-1"
                        onClick={() => handleIncrease(index)}
                        aria-label="Increase quantity"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className="fs-5">${(item.itemPrice * item.quantity).toFixed(0)}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.productId)}
                      aria-label="Remove item"
                      type="button"
                      disabled={loading}
                    >
                      <i className="fas fa-trash-alt me-1"></i>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </main>
    <LastPartCart cart={totalPrice} />
    </>
  );
}

export default SecondSectionC;
