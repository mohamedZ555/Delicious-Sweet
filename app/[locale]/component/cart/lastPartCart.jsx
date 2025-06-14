import "../../../../styles/pagesStyle/cart/lastPartCart.css";
import {Link} from "@/i18n/routing";
import { useTranslations } from "next-intl";


function LastPartCart() {
    const t =  useTranslations("lastPartCart");

  return (
    <main className="container mb-sm-5 pb-5">
      <section className="d-flex justify-content-md-between justify-content-center align-items-center align-items-md-start flex-column gap-5 gap-md-0 flex-md-row">
        <div className="d-flex align-items-center couponCont">
          <input
            type="text"
            placeholder="coupon code"
            className="px-3 couponInput h-100"
          />
          <div className="couponButtun fw-semibold px-4 h-100 text-white d-flex align-items-center justify-content-center">
          {t("Apply Coupon")}
          </div>
        </div>
        <div>
          <div className="calcTotalCont">
            <div className="CARTCalc text-white text-center py-2 fw-bold w-100">
            {t("cartTotal")}
            </div>
            <div className="p-4 cartTotBorder">
              <div className="subTot pb-3 d-flex align-items-center justify-content-between">
                {t("subtotal")}: <span className="numbersColorGray">$568</span>
              </div>
              <div className="disCount d-flex align-items-center justify-content-between">
              {t("discount")} : <span className="numbersColorGray">$80</span>
              </div>
            </div>
            <div className="totalCost d-flex align-items-center justify-content-between py-2 px-4">
            {t("total")} : <span className="numbersColorGreen">$890.00</span>
            </div>
          </div>
          <div className="pt-4 d-flex justify-content-md-end align-items-center justify-content-center">
            <Link href="/cart/check-out" className="underDecor checkOut py-3 px-5 text-white fw-bold">
            {t("checkout")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LastPartCart;
