import HomeSideBare from "./homeFirstPart/homeSideBare";
import HomeSlider from "./homeFirstPart/homeSlider";

export default function HomeCollector() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-12 col-sm-3 homeFirstBorder">
      <HomeSideBare />
      </div>
      <div className="col-12 col-sm-9 ">
      <HomeSlider />
      </div>
      </div>
    </div>
    );
  }
  