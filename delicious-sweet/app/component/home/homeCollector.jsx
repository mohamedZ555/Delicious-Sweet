import HomeSideBare from "./homeFirstPart/homeSideBare";
import HomeSlider from "./homeFirstPart/homeSlider";

export default function HomeCollector() {
    return (
      <div className="container">
      <div className="d-flex flex-column-reverse flex-md-row align-items-center">
      <div className="col-12 col-md-3 homeFirstBorder position-relative">
      <HomeSideBare />
      </div>
      <div className="col-12 col-md-9 ">
      <HomeSlider />
      </div>
      </div>
    </div>
    );
  }
  