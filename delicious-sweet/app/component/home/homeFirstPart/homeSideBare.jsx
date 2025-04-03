const diss = [
  { test: "sweets" },
  { test: "des" },
  { test: "sweasdsadets" },
  { test: "sweetwdsad" },
  { test: "sweetsaaaaa" },
];

export default function HomeSideBare() {
  return (
    <div className="pt-4">
      {diss.map((items, key) => (
        <div key={key}>{items.test}</div> // ✅ Added parentheses for implicit return
      ))}
    </div>
  );
}
