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

async function getFlashData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Products/flashsale?flashsaleNumber=100`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`API Error`);
  const result = await res.json();
  return result?.data || [];
}
async function getHomeSectionOne() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/HomeSections`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API Error`);
  const result = await res.json();
  return result?.data || [];
}
async function getAllProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/Products/GetAllProductsForUser`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`API Error`);
  const result = await res.json();
  return result?.data || [];
}

export default async function HomeCollector({ locale }) {
  const arivalData = await getArival();
  const homeSectionOneData = await getHomeSectionOne();
  const flashData = await getFlashData();
  const allProducts = await getAllProducts();
  return (
    <div className="container">
      <div className="d-flex flex-column-reverse flex-md-row align-items-center">
        <HomeSlider homeSectionOneData={homeSectionOneData} />
      </div>
      <FlashSales flashData={flashData} locale={locale} />
      <hr />
      <BestSelling allProducts={allProducts} locale={locale} />
      <hr />
      <div>
        <HomeSixthPart allProducts={allProducts} locale={locale} />
      </div>
      <hr />
      <div className="pb-md-5 pb-0 pb-sm-3">
        <HomeLastPart arivalData={arivalData} />
      </div>
    </div>
  );
}
