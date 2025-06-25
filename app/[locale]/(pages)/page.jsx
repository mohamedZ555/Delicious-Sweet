import HomeCollector from "../component/home/homeCollector";

export default async function Home({params}) {
  const { locale } = await params;
  return (
    <div>
      <HomeCollector locale={locale} />
    </div>
  );
}
