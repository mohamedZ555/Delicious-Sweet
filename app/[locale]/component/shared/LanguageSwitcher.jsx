"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import "../../../../styles/pagesStyle/switcher.css";
export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Remove the current locale from the pathname
  const cleanPathname = pathname.replace(/^\/(en|ar)/, "") || "/";

  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    router.push(`/${newLocale}${cleanPathname}`);
  };

  return (
    <select
      className="lang-dropdown fw-bold px-2 mt-1"
      value={locale}
      onChange={handleLanguageChange}
    >
      <option value="en" className="text-black fw-bold">
        EN
      </option>
      <option value="ar" className="text-black fw-bold">
        Ar
      </option>
    </select>
  );
}
