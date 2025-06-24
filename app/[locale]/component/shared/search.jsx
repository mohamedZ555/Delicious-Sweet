"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch, locale }) {
  const t = useTranslations("search");
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center position-relative">
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        className="sideBarSearch col-12 py-2 px-3 rounded-4"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <div
        className={`position-absolute pointer mx-3 ${
          locale === "ar" ? "start-0" : "end-0"
        }`}
        onClick={handleSearch}
      >
        <FaSearch />
      </div>
    </form>
  );
}
