"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import "../../../../styles/pagesStyle/profile/profile.css";

export default function Profile() {
  const t = useTranslations("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    governorate: "",
    street: "",
    buildingNumber: "",
    addressLine: "",
    landMark: "",
  });

  useEffect(() => {
    // Initialize token from localStorage on client side
    setToken(
      typeof window !== "undefined" ? localStorage.getItem("token") : null
    );
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const result = await response.json();
        const data = result.data;
        const defaultAddress = {
          governorate: "",
          street: "",
          buildingNumber: "",
          addressLine: "",
          landMark: "",
        };

        const primaryAddress = data.userAddress?.[0] || defaultAddress;

        setUserData({
          fullName: data.fullName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          governorate: primaryAddress.governorate,
          street: primaryAddress.street,
          buildingNumber: primaryAddress.buildingNumber,
          addressLine: primaryAddress.addressLine,
          landMark: primaryAddress.landMark,
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      if (newToken) fetchUserData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [token]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Basic validation
      if (!userData.fullName || !userData.email) {
        throw new Error("Full name and email are required");
      }

      // First fetch the current data to have the previous values
      const currentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!currentResponse.ok) {
        throw new Error("Failed to fetch current profile data");
      }

      const currentResult = await currentResponse.json();
      const currentData = currentResult.data || currentResult;
      const currentAddress = currentData.userAddress?.[0] || {};

      const dataToSend = {
        fullName: userData.fullName || currentData.fullName,
        email: userData.email || currentData.email,
        phoneNumber: userData.phoneNumber || currentData.phoneNumber,
        userAddress: [
          {
            governorate: userData.governorate || currentAddress.governorate,
            street: userData.street || currentAddress.street,
            buildingNumber:
              userData.buildingNumber || currentAddress.buildingNumber,
            addressLine: userData.addressLine || currentAddress.addressLine,
            landMark: userData.landMark || currentAddress.landMark,
          },
        ],
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const result = await response.json();
      const updatedData = result.data || result;
      const primaryAddress = updatedData.userAddress?.[0] || {};

      setUserData({
        fullName: updatedData.fullName || userData.fullName,
        email: updatedData.email || userData.email,
        phoneNumber: updatedData.phoneNumber || userData.phoneNumber,
        governorate: primaryAddress.governorate || userData.governorate,
        street: primaryAddress.street || userData.street,
        buildingNumber:
          primaryAddress.buildingNumber || userData.buildingNumber,
        addressLine: primaryAddress.addressLine || userData.addressLine,
        landMark: primaryAddress.landMark || userData.landMark,
      });

      setIsEditing(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!token) {
    return (
      <div className="mt-5 pt-5">
        <h1 className="text-center py-5 mt-5 text-capitalize">
          {t("loginFirst")}
        </h1>
      </div>
    );
  }

  if (isLoading && !isEditing) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 my-5 container">
      <div className="pt-5 d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column align-items-start">
          <div className="profileName fw-bold text-capitalize">
            {userData.fullName}
          </div>
          <div className="profileEmail fw-semibold">{userData.email}</div>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="editProfile py-1 px-4 text-white rounded border-0"
            disabled={isLoading}
          >
            {t("edit")}
          </button>
        ) : (
          <div className="d-flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-outline-secondary py-1 px-4 rounded"
              disabled={isLoading}
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSave}
              className="editProfile py-1 px-4 text-white rounded border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {t("saving")}
                </>
              ) : (
                t("save")
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="row">
          {[
            { label: t("fullName"), key: "fullName", type: "text" },
            { label: t("email"), key: "email", type: "email" },
            { label: t("phone"), key: "phoneNumber", type: "tel" },
            { label: t("governorate"), key: "governorate", type: "text" },
            { label: t("street"), key: "street", type: "text" },
            { label: t("buildingNumber"), key: "buildingNumber", type: "text" },
            { label: t("addressLine"), key: "addressLine", type: "text" },
            { label: t("landMark"), key: "landMark", type: "text" },
          ].map(({ label, key, type }) => (
            <div key={key} className="col-md-6 col-12 mt-4">
              <label htmlFor={key} className="fw-bold profileLabel">
                {label}
              </label>
              {!isEditing ? (
                <div className="w-100 mt-2 py-3 px-3 border-0 rounded-3 profileData">
                  {userData[key] || (
                    <span className="text-muted">{t("Notprovided")} </span>
                  )}
                </div>
              ) : (
                <input
                  type={type}
                  id={key}
                  name={key}
                  className="w-100 mt-2 py-3 px-3 rounded-3 border-0 profileData"
                  placeholder={t("enter") + " " + label.toLowerCase()}
                  value={userData[key]}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
