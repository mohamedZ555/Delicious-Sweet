import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});
// export type Locale = (typeof routing.locales)[number];
export const { redirect, usePathname, Link, useRouter } =
  createNavigation(routing);
