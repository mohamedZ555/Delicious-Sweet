import HomeSideBare from "./homeFirstPart/homeSideBare";
import HomeSlider from "./homeFirstPart/homeSlider";
import FlashSales from "./homeSecondPart/flashSales";
import BrowseCategory from "./homeThirdPart/browseCategory";
import BestSelling from "./homeFourthPart/bestSelling";
import HomeFifthPart from "./homeFifthPart/fifthPart";
import HomeSixthPart from "./homeSixthPart/ourProducts";
import HomeLastPart from "./homeLastPart/homeLastPart";
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
      <FlashSales />
      <hr />
      <BrowseCategory />
      <hr />
      <BestSelling />

      <HomeFifthPart />
      <div>
        <HomeSixthPart />
      </div>
      <div className="pb-md-5 pb-0 pb-sm-3">
      <HomeLastPart />
      </div>
    </div>
    );
  }
  