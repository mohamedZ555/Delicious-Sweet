"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const router = useRouter();
  const t = useTranslations("ContactPage");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // You can also fetch user data here if needed
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  if (loading) {
    return (
      <h1 className="fw-bold d-flex align-items-center justify-content-center pt-5 mt-5">
        <div className="pt-5">{t("Loading")}</div>
      </h1>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        loading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useAddToCart = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addToCartError, setAddToCartError] = useState(null);

  const addToCart = async (productId, quantity = 1) => {
    if (!isLoggedIn) {
      setAddToCartError("Please login to add items to cart");
      return { success: false, error: "Please login to add items to cart" };
    }

    setIsAddingToCart(true);
    setAddToCartError(null);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await fetch(
        "https://swdteam1-001-site1.qtempurl.com/api/Cart/AddToCart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: productId,
            quantity: quantity,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error.message;
      setAddToCartError(errorMessage);
      
      if (errorMessage.includes("Unauthorized")) {
        logout();
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setIsAddingToCart(false);
    }
  };

  return {
    addToCart,
    isAddingToCart,
    addToCartError,
    clearAddToCartError: () => setAddToCartError(null),
  };
};
