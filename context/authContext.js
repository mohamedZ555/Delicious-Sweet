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
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);
  const [wishlistVersion, setWishlistVersion] = useState(0);
  const router = useRouter();
  const t = useTranslations("ContactPage");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
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
    router.push("/");
  };

  const clearWishlistError = () => {
    setWishlistError(null);
  };

  const toggleWishlist = async (productId, forceRemove = false) => {
    if (!isLoggedIn) {
      setWishlistError("Please login to manage your wishlist");
      return { success: false, error: "Please login to manage your wishlist" };
    }

    setWishlistLoading(true);
    setWishlistError(null);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        throw new Error("No authentication token available");
      }

      const isCurrentlyInWishlist = wishlist.includes(productId);
      const shouldRemove = forceRemove || isCurrentlyInWishlist;
      const endpoint = shouldRemove
        ? `${process.env.NEXT_PUBLIC_API_URL}/WishList/RemoveFromWishList/${productId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/WishList/AddToWishList?ProductId=${productId}`;

      const response = await fetch(endpoint, {
        method: shouldRemove ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: shouldRemove ? undefined : JSON.stringify({}),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        if (response.status === 404) {
          throw new Error("Product not found");
        }
        if (response.status === 400) {
          throw new Error("Invalid request");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      // Toggle the wishlist state locally
      setWishlist((prev) => {
        let updated;
        if (prev.includes(productId)) {
          updated = prev.filter((id) => id !== productId);
        } else {
          updated = [...prev, productId];
        }
        setWishlistVersion((v) => v + 1);
        return updated;
      });

      return {
        success: true,
        action: shouldRemove ? "removed" : "added",
        productId,
      };
    } catch (error) {
      const errorMessage = error.message;
      setWishlistError(errorMessage);

      if (errorMessage.includes("Unauthorized")) {
        logout();
      }
      return { success: false, error: errorMessage };
    } finally {
      setWishlistLoading(false);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const clearWishlist = async () => {
    if (!isLoggedIn) {
      setWishlistError("Please login to manage your wishlist");
      return { success: false, error: "Please login to manage your wishlist" };
    }

    setWishlistLoading(true);
    setWishlistError(null);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/WishList/ClearWishList`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      // Clear the wishlist state locally
      setWishlist([]);
      setWishlistVersion((v) => v + 1);

      return { success: true, message: "Wishlist cleared successfully" };
    } catch (error) {
      const errorMessage = error.message;
      setWishlistError(errorMessage);

      if (errorMessage.includes("Unauthorized")) {
        logout();
      }
      return { success: false, error: errorMessage };
    } finally {
      setWishlistLoading(false);
    }
  };

  // Fetch wishlist from API and set state
  const fetchWishlist = async () => {
    if (!isLoggedIn) return;
    setWishlistLoading(true);
    setWishlistError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) throw new Error("No authentication token available");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/WishList/GetAllByUserId`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 401) throw new Error("Unauthorized - Please login again");
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }
      const data = await response.json();
      // Assuming the API returns an array of wishlist items
      setWishlist(Array.isArray(data) ? data.map(item => item.productId || item.id || item) : []);
    } catch (error) {
      const errorMessage = error.message;
      setWishlistError(errorMessage);
      if (errorMessage.includes("Unauthorized")) logout();
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        loading,
        authError,
        wishlist,
        setWishlist,
        wishlistLoading,
        setWishlistLoading,
        wishlistError,
        setWishlistError,
        clearWishlistError,
        toggleWishlist,
        isInWishlist,
        getWishlistCount,
        clearWishlist,
        fetchWishlist,
        wishlistVersion,
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
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Cart/AddToCart`,
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
