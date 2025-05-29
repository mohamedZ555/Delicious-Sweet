import "../../../../styles/pagesStyle/checkout/secondSectionCheck.css";
function SecondSectionCheck() {
  return (
    <>
      <main className="container py-5 my-md-5">
        <section className="row">
          <div className="col-md-5 col-12">
            <div className="fw-bold checkoutTitle pb-5">YOUR ORDER</div>
            <div className="checkoutDisc">We all know how hard it can be make sure ead lookis like demo tom make your start intoe the world of easy ase possible have encluded the demom</div>
            <div className="row d-flex flex-column-reverse flex-sm-row">
              <div className="col-md-12 col-sm-6 col-12 pt-lg-5 pt-4">
                <div className="CARTCalc checkoutCart text-white text-center py-3 fw-bold w-100">
                CART TOTAL
                </div>
                <div className="p-4 cartTotBorder">
                  <div className="subTot pb-3 d-flex align-items-center justify-content-between">
                  Subtotal:<span className="numbersColorGray">$568</span>
                  </div>
                  <div className="disCount d-flex align-items-center justify-content-between">
                  Discount:<span className="numbersColorGray">$80</span>
                  </div>
                </div>
                <div className="totalCost d-flex align-items-center justify-content-between py-2 px-4">
                Total:<span className="numbersColorgold">$890.00</span>
                </div>
                <div className="pt-4">
                  <div className="checkOut py-md-3 px-md-5 py-2 px-4 text-white fw-bold ms-auto me-auto me-md-0">
                  CHECKOUT
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-6 col-12 pt-lg-5 pt-4">
                <div className="paymentText text-center py-3 fw-bold w-100">
                PAYMENT METHOD
                </div>
                <div className="p-md-4 p-3 cartTotBorder">
                  <div className="subTot pb-3 d-flex align-items-center justify-content-between">
                    <div className="form-check d-flex gap-lg-3 gap-2">
                      <input
                        className="form-check-input checkoutCheck"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label creditText fw-bold"
                        htmlFor="flexRadioDefault1"
                      >
                        Credit Card
                      </label>
                    </div>
                    <img
                      src="/images/checkoutIMG/credit_card_logos.png"
                      alt="Credit Card Logos"
                      className="checkOutIMG"
                    />
                  </div>
                  <div className="disCount d-flex align-items-center justify-content-between">
                    <div className="form-check d-flex gap-lg-3 gap-2 align-items-center">
                      <input
                        className="form-check-input checkoutCheck"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label
                        className="form-check-label creditText fw-bold"
                        htmlFor="flexRadioDefault2"
                      >
                        PayPal
                      </label>
                    </div>
                    <img
                      src="/images/checkoutIMG/paypal-logo.png"
                      alt="PayPal Logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12 ps-md-5">
            <div className="fw-bold checkoutTitle pb-5 pt-5 pt-md-0">
            BILLING DETAILS
            </div>
            <form>
              <div className="d-flex align-items-center justify-content-between mb-4 flex-column gap-4 gap-sm-0 flex-sm-row">
                <input
                  type="text"
                  placeholder="Name*"
                  className="checkoutForm px-3 py-lg-3 py-md-2 py-3"
                />
                <input
                  type="text"
                  placeholder="Nick Name*"
                  className="checkoutForm px-3 py-lg-3 py-md-2 py-3"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4 flex-column gap-4 gap-sm-0 flex-sm-row">
                <input
                  type="email"
                  placeholder="Email*"
                  className="checkoutForm px-3 py-lg-3 py-md-2 py-3"
                />
                <input
                  type="text"
                  placeholder="Phone No."
                  className="checkoutForm px-3 py-lg-3 py-md-2 py-3"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4 flex-column gap-4 gap-sm-0 flex-sm-row">
                <input
                  type="text"
                  placeholder="Country:"
                  className="checkoutForm px-3 py-lg-3 py-md-2 py-3"
                />
                <input
                  type="text"
                  placeholder="State/Disctrict:"
                  className="checkoutForm px-3 py-lg-3 py-md-2 py-3"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4 flex-column gap-4 gap-sm-0 flex-sm-row">
                <input
                  type="text"
                  placeholder="Address:"
                  className="checkoutForm px-3 py-lg-3 py-md-2 py-3"
                />
                <input
                  type="text"
                  placeholder="Zip/Postal Code:"
                  className="checkoutForm px-3 py-lg-3 py-md-2 py-3"
                />
              </div>
              <div>
                <textarea
                  placeholder="Note of order:"
                  className="w-100 noteOF p-3"
                ></textarea>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default SecondSectionCheck;
