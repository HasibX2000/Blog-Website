import React from "react";
import Hero from "../components/Home/Hero";
import CategoryFeature from "../components/Cards/CategoryFeature";

export default function Homepage() {
  const category = ["National", "International", "Sports", "Health", "Science"];
  return (
    <div className="bg-primary min-h-[calc(100vh-449px)]">
      <Hero />
      <>
        {category.map((item) => (
          <CategoryFeature title={item} key={item} />
        ))}
      </>
    </div>
  );
}
