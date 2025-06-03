"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const router = useRouter();
  const t = useTranslations("ContactPage");
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (token) => {
    if (!token) {
      setAuthError("No authentication token received");
      return false;
    }

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      setIsLoggedIn(true);
      setAuthError(null);
      return true;
    } catch (error) {
      setAuthError("Failed to store authentication token");
      return false;
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (isLoading) {
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
        isLoading,
        authError,
        login,
        logout,
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
