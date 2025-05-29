"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import "../../../../styles/pagesStyle/switcher.css";
export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedLocale, setSelectedLocale] = useState(locale);

  // Remove the current locale from the pathname
  const cleanPathname = pathname.replace(/^\/(en|ar)/, "") || "/";

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    setSelectedLocale(newLocale);
    router.push(`/${newLocale}${cleanPathname}`);
  };

  return (
    <select
      className="lang-dropdown fw-bold w-100 px-2 mt-1"
      value={selectedLocale}
      onChange={handleLanguageChange}
    >
      <option value="en" className="text-black fw-bold">
        EN
      </option>
      <option value="ar" className="text-black fw-bold">
        AR
      </option>
    </select>
  );
}
