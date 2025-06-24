import "../../../../styles/pagesStyle/cart/lastPartCart.css";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

function LastPartCart({ cart }) {
  const t = useTranslations("lastPartCart");

  return (
    <main className="container mb-sm-5 pb-5">
      <section className="d-flex justify-content-md-center justify-content-center align-items-center align-items-md-start flex-column gap-5 gap-md-0 flex-md-row">
        <div>
          <div className="calcTotalCont">
            <div className="CARTCalc text-white text-center py-3 fw-bold w-100">
              <i className="fas fa-shopping-cart me-2"></i>
              {t("cartTotal")}
            </div>
            <div className="p-4 cartTotBorder">
              <div className="subTot pb-3 d-flex align-items-center justify-content-between">
                <span className="d-flex align-items-center">
                  <i className="fas fa-receipt me-2 text-muted"></i>
                  {t("subtotal")}
                </span>
                <span className="numbersColorGray fw-semibold">
                  ${cart || 0}
                </span>
              </div>
            </div>
            <div className="totalCost d-flex align-items-center justify-content-between py-3 px-4">
              <span className="d-flex align-items-center fw-bold">
                <i className="fas fa-calculator me-2"></i>
                {t("total")}
              </span>
              <span className="numbersColorGreen fw-bold fs-5">
                ${cart || 0}
              </span>
            </div>
          </div>
          <div className="pt-4 d-flex justify-content-md-end align-items-center justify-content-center">
            <Link
              href="/cart/check-out"
              className="underDecor checkOut py-3 px-5 text-white fw-bold d-flex align-items-center"
            >
              <i className="fas fa-credit-card me-2"></i>
              {t("checkout")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LastPartCart;
