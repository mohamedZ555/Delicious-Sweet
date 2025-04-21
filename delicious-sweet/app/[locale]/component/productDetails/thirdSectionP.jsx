"use client";
import { useState } from "react";
import "../../../styles/pagesStyle/product/thirdSectionP.css";

const ThirdSectionP = () => {
  const [selectedTab, setSelectedTab] = useState("DESCRIPTION");

  const productDetails = {
    description:
      "Fresh strawberries are very high in water, so their total carb content is very low — fewer than 8 grams of carbs per 3.5 ounces (100 grams). The net digestible carb content is fewer than 6 grams in the same serving size. Most of these berries’ carbs come from simple sugars such as glucose, fructose, and sucrose but they contain a decent amount of fiber. Strawberries have a glycemic index (GI) score of 40, which is relatively low (4). This means that strawberries should not lead to big spikes in blood sugar levels and are considered safe for people with diabetes.",
    information:
      "Fresh strawberries are very high in water, so their total carb content is very low — fewer than 8 grams of carbs per 3.5 ounces (100 grams). The net digestible carb content is fewer than 6 grams in the same serving size. Most of these berries’ carbs come from simple sugars such as glucose, fructose, and sucrose but they contain a decent amount of fiber. Strawberries have a glycemic index (GI) score of 40, which is relatively low (4). This means that strawberries should not lead to big spikes in blood sugar levels and are considered safe for people with diabetes.",
    review:
      "Fresh strawberries are very high in water, so their total carb content is very low — fewer than 8 grams of carbs per 3.5 ounces (100 grams). The net digestible carb content is fewer than 6 grams in the same serving size. Most of these berries’ carbs come from simple sugars such as glucose, fructose, and sucrose but they contain a decent amount of fiber. Strawberries have a glycemic index (GI) score of 40, which is relatively low (4). This means that strawberries should not lead to big spikes in blood sugar levels and are considered safe for people with diabetes.",
  };

  return (
    <main className="container">
      <section>
        <div className="bar d-flex align-items-center justify-content-between justify-content-sm-start gap-sm-3">
          {["DESCRIPTION", "INFORMATION", "REVIEW"].map((tab) => (
            <div
              key={tab}
              className={`fw-semibold py-lg-3 px-lg-5 px-sm-4 px-3 py-2 thirdDesc ${
                selectedTab === tab ? "activate" : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="content mt-4 pt-2">
          <div className="thirdInformation">
            <p>{productDetails[selectedTab.toLowerCase()]}</p>
            <p>{productDetails[selectedTab.toLowerCase()]}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ThirdSectionP;
