import styles from "../../../../../styles/pagesStyle/home/flashSales.module.css";

export default function HomeLastPart() {
  return (
    <main className="pb-lg-5 my-lg-5 pb-4 my-4">
      <section>
        <div className="d-flex align-items-center gap-3 pb-3">
          <div className="redBox"></div>
          <div className="redText">Featured</div>
        </div>
        <div className="pb-lg-5 pb-4">
          <div className="d-flex gap-5">
            <div className={`${styles.flashText} fw-semibold`}>
              New Arrival
            </div>
          </div>
        </div>
        <div className="">
          <div className="row gap-3 gap-md-4 gap-lg-0">
            {/* Image on large screens */}
            <div className="col-12 col-lg-6">
              <img
                src="/images/slider.jpg"
                className="w-100 rounded"
                height={600}
                alt="Slider"
              />
            </div>
            <div className="col-12 col-lg-6 gap-3 gap-md-4 gap-lg-0 d-flex flex-column justify-content-between">
              {/* Top image */}
              <div>
                <img
                  src="/images/slider.jpg"
                  className="w-100 rounded"
                  height={285}
                  alt="Slider"
                />
              </div>
              <div className="row gap-3 gap-sm-0">
                {/* Bottom images - responsive layout */}
                <div className="col-12 col-sm-6">
                  <img
                    src="/images/slider.jpg"
                    className="w-100 rounded"
                    height={285}
                    alt="Slider"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <img
                    src="/images/slider.jpg"
                    className="w-100 rounded"
                    height={285}
                    alt="Slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
