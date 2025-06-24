import HomeCollector from "../component/home/homeCollector";

export default async function Home({params}) {
  const { local } = await params;
  return (
    <div>
      <HomeCollector local={local} />
    </div>
  );
}
