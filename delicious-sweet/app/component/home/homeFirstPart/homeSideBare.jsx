import "../../../../styles/pagesStyle/home/home.css"
const diss = [
  { test: "sweets" },
  { test: "des" },
  { test: "sweasdsadets" },
  { test: "sweetwdsad" },
  { test: "sweetsaaaaa" },
  { test: "sweetsaaaaa" },
  { test: "sweetsasdaaasa" },
  { test: "sweetsdaa" },
  { test: "swewwwwwwaa" },
];

export default function HomeSideBare() {
  return (
    <div className="mt-5">
      {diss.map((items, key) => (
        <div key={key} >
          <div className="catTXT mt-3">{items.test}</div>
        </div>
      ))}
    </div>
  );
}
