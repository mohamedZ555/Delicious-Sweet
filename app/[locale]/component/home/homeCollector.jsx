import HomeSlider from "./homeFirstPart/homeSlider";
import FlashSales from "./homeSecondPart/flashSales";
import BestSelling from "./homeFourthPart/bestSelling";
import HomeSixthPart from "./homeSixthPart/ourProducts";
import HomeLastPart from "./homeLastPart/homeLastPart";
async function getArival() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Products/newArrivale`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`API Error`);
  const results = await res.json();
  return results?.data || [];
}

async function getHomeSectionOne() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/HomeSections`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API Error`);
  const result = await res.json();
  return result?.data || [];
}

export default async function HomeCollector({ locale }) {
  const arivalData = await getArival();
  const homeSectionOneData = await getHomeSectionOne();
  return (
    <div className="container">
      <div className="d-flex flex-column-reverse flex-md-row align-items-center">
        <HomeSlider homeSectionOneData={homeSectionOneData} />
      </div>
      <FlashSales locale={locale} />
      <hr />
      <BestSelling locale={locale} />
      <hr />
      <div>
        <HomeSixthPart locale={locale} />
      </div>
      <hr />
      <div className="pb-md-5 pb-0 pb-sm-3">
        <HomeLastPart arivalData={arivalData} />
      </div>
    </div>
  );
}
