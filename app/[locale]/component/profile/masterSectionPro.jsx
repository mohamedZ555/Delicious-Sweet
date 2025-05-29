"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import "../../../../styles/pagesStyle/profile/profile.css";

export default function Profile() {
  const t = useTranslations("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userData, setUserData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData({
          f_name: data.f_name || "",
          l_name: data.l_name || "",
          email: data.email || "",
          phone: data.phone || "",
          country: data.country || "",
          city: data.city || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customer/update-profile`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();
      setUserData((prev) => ({
        ...prev,
        ...updatedData, // Ensure we update only modified fields
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="py-5 my-5 container">
      <div className="pt-5 d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column align-items-start">
          <div className="profileName fw-bold text-capitalize">
            {userData.f_name} {userData.l_name}
          </div>
          <div className="profileEmail fw-semibold">{userData.email}</div>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="editProfile py-1 px-4 text-white rounded border-0"
          >
            {t("edit")}
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="editProfile py-1 px-4 text-white rounded border-0"
            disabled={isLoading}
          >
            {isLoading ? t("saving") : t("save")}
          </button>
        )}
      </div>

      <div className="mt-5">
        <div className="row">
          {[
            { label: t("firstName"), key: "f_name", type: "text" },
            { label: t("lastName"), key: "l_name", type: "text" },
            { label: t("email"), key: "email", type: "email" },
            { label: t("phone"), key: "phone", type: "text" },
            { label: t("country"), key: "country", type: "text" },
            { label: t("city"), key: "city", type: "text" },
          ].map(({ label, key, type }) => (
            <div key={key} className="col-md-6 col-12 mt-4">
              <label htmlFor={key} className="fw-bold profileLabel">
                {label}
              </label>
              {!isEditing ? (
                <div className="w-100 mt-2 py-3 px-3 border-0 profileData">
                  {userData[key]}
                </div>
              ) : (
                <input
                  type={type}
                  id={key}
                  className="w-100 mt-2 py-3 px-3 border-0 profileData"
                  placeholder={t("enter") + " " + label.toLowerCase()}
                  value={userData[key]}
                  onChange={(e) =>
                    setUserData({ ...userData, [key]: e.target.value })
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
