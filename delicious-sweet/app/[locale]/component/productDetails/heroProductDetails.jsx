import {Link} from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import "../../../../styles/pagesStyle/product/heroSectionP.css";

function HeroProductDetails() {
  const t = useTranslations("productDetails");

  return (
    <main className="py-5 productContain">
      <Image
        className="leavesP position-absolute"
        width={200}
        height={323}
        src="/image/productIamges/productHeaderIMG.png"
        alt={t("productHeaderImageAlt")}
      />
      <section className="container my-5 py-5 position-relative ps-md-5">
        <div className="pt-5 ps-5 ms-5">
          <div className="ps-3">
            <div className="productHeader fw-semibold pb-2">
              {t("productDetails")}
            </div>
            <div>
              <Link
                href="/"
                className="underDecor productHeaderBTN text-white fw-semibold px-4 py-1"
              >
                {t("homePages")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HeroProductDetails;
