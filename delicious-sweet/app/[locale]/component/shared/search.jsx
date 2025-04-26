"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaSearch } from "react-icons/fa";

export default function Search({ setSearchTerm }) {
  const t = useTranslations("search");
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      setSearchTerm(inputValue.trim().toLowerCase()); 
      setInputValue(""); 
    }
  };

  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        placeholder={t("placeholder")}
        className="sideBarSearch col-9 py-lg-3 px-lg-4 py-2 px-3"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <div
        className="serrch col-3 d-flex align-items-center justify-content-center py-lg-3 py-2 fw-bold"
        onClick={handleSearch}
        aria-label={t("searchButton")}
      >
        <FaSearch />
      </div>
    </div>
  );
}
